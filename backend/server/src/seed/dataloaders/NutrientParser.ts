import {
  Gender,
  ImportType,
  Prisma,
  SpecialCondition,
  TargetPreference,
} from "@prisma/client";
import { readCSV } from "../../services/io/Readers.js";
import { db } from "../../db.js";
import { z } from "zod";
import {
  cleanedStringSchema,
  nullableString,
  stringArray,
} from "../../validations/utilValidations.js";
import { toTitleCase } from "../../util/utils.js";
import { UnitSearch } from "../../services/search/UnitSearch.js";
import { NutrientType } from "@prisma/client";

type NutrientParseInput = {
  nutrientPath: string;
  mineralDriPath: string;
  vitaminDriPath: string;
  mappingSavePath: string;
};

const stringToNumberSchema = z.string().transform((str) => {
  // If the string is empty, return undefined
  if (str === "") {
    return undefined;
  }

  // Try to convert the string to a number
  const num = Number(str);

  // If the conversion results in NaN, return undefined
  if (isNaN(num)) {
    return undefined;
  }

  // Otherwise, return the number
  return num;
});

const booleanParamSchema = z
  .enum(["TRUE", "FALSE"])
  .transform((value) => value === "TRUE");

const nutrientSchema = z.object({
  id: z.string().cuid(),
  nutrient: cleanedStringSchema(30, toTitleCase),
  isMacro: booleanParamSchema,
  unitAbbreviation: nullableString,
  target: stringToNumberSchema,
  preference: z.preprocess((val) => {
    return String(val).toUpperCase();
  }, z.nativeEnum(TargetPreference)),
  threshold: stringToNumberSchema,
  unit: cleanedStringSchema(10),
  advancedView: booleanParamSchema,
  important: booleanParamSchema,
  order: z.coerce.number().int().positive(),
  notes: nullableString,
  alternateNames: stringArray,
  type: z.preprocess((val) => {
    return String(val).toUpperCase();
  }, z.nativeEnum(NutrientType)),
  parentNutrient: nullableString,
  cronometer: nullableString,
  recipeKeeper: nullableString,
  myFitnessPal: nullableString,
  dri: nullableString,
  web: nullableString,
});

export class NutrientLoader {
  nutrientPath: string;
  mineralDriPath: string;
  vitaminDriPath: string;

  constructor(input?: NutrientParseInput) {
    this.nutrientPath = input?.nutrientPath
      ? input.nutrientPath
      : "../../../data/seed_data/nutrients.csv";
    this.vitaminDriPath = input?.nutrientPath
      ? input.nutrientPath
      : "../../../data/seed_data/vitamins_dri.csv";
    this.mineralDriPath = input?.mineralDriPath
      ? input.mineralDriPath
      : "../../../data/seed_data/minerals_dri.csv";
  }

  async parseNutrients(): Promise<{
    createNutrientsStmt: Prisma.NutrientCreateInput[];
    updateNutrientsStmt: Prisma.NutrientUpdateArgs[];
  }> {
    const data = await readCSV(this.nutrientPath);

    // read in nutrients to create mapping
    // Use mapping to map DRI to nutrient,
    const createNutrientsStmt: Prisma.NutrientCreateInput[] = [];
    const updateNutrientsStmt: Prisma.NutrientUpdateArgs[] = [];
    const units = new UnitSearch(await db.measurementUnit.findMany({}));
    for (const { record } of data) {
      // Validate the record
      const cleanedRecord = nutrientSchema.parse(record);
      const matchedUnit = units.search(cleanedRecord.unit);

      //   Create stmts for creating nutrients
      const createStmt: Prisma.NutrientCreateInput = {
        id: cleanedRecord.id,
        name: cleanedRecord.nutrient,
        isMacro: cleanedRecord.isMacro,
        alternateNames: cleanedRecord.alternateNames,
        type: cleanedRecord.type,
        important: cleanedRecord.important,
        advancedView: cleanedRecord.advancedView,
        unit: matchedUnit ? { connect: { id: matchedUnit.id } } : {},
        order: cleanedRecord.order,
        mappings: {
          createMany: {
            data: [
              {
                importType: "CRONOMETER" as ImportType,
                lookupName: cleanedRecord.cronometer,
              },
              {
                importType: "RECIPE_KEEPER" as ImportType,
                lookupName: cleanedRecord.recipeKeeper,
              },
              {
                importType: "MY_FITNESS_PAL" as ImportType,
                lookupName: cleanedRecord.myFitnessPal,
              },
              {
                importType: "DRI" as ImportType,
                lookupName: cleanedRecord.dri,
              },
              {
                importType: "WEB" as ImportType,
                lookupName: cleanedRecord.dri,
              },
            ].filter(
              (row) => row.lookupName
            ) as Prisma.NutrientImportMappingCreateInput[],
          },
        },
      };

      if (cleanedRecord.target && cleanedRecord.preference) {
        createStmt.target = {
          create: {
            targetValue: cleanedRecord.target,
            threshold: cleanedRecord.threshold,
            preference: cleanedRecord.preference,
          },
        };
      }

      createNutrientsStmt.push(createStmt);

      // Connect parent and child nutrients
      if (cleanedRecord.parentNutrient) {
        updateNutrientsStmt.push({
          where: { name: cleanedRecord.nutrient },
          data: {
            parentNutrient: {
              connect: {
                name: cleanedRecord.parentNutrient,
              },
            },
          },
        });
      }
    }
    return {
      createNutrientsStmt,
      updateNutrientsStmt,
    };
  }

  async getDriMapping(): Promise<Map<string, string>> {
    const nutrients = await db.nutrientImportMapping.findMany({
      where: { importType: "DRI" },
      include: { nutrient: true },
    });
    if (nutrients.length === 0)
      throw Error("Nutrients and mappings need to be loaded first");

    return nutrients.reduce((agg, val) => {
      agg.set(val.lookupName, val.nutrientId);
      return agg;
    }, new Map<string, string>());
  }

  async parseDRIs(): Promise<Prisma.DailyReferenceIntakeCreateInput[]> {
    const mineralDRI = await readCSV(this.mineralDriPath);
    const vitaminDRI = await readCSV(this.vitaminDriPath);

    const dris = [...mineralDRI, ...vitaminDRI];
    const mapping = await this.getDriMapping();

    const createDriStmts: Prisma.DailyReferenceIntakeCreateInput[] = [];
    for (const { record } of dris) {
      const { gender, specialCondition, minAge, maxAge, ...rest } = record;

      for (const [nutrient, value] of Object.entries(rest)) {
        if (nutrient.indexOf("Max") === -1 && mapping.has(nutrient)) {
          const upperLimit = rest[`${nutrient}Max`]
            ? z.coerce.number().positive().parse(rest[`${nutrient}Max`])
            : undefined;
          createDriStmts.push({
            nutrient: { connect: { id: mapping.get(nutrient) } },
            value: z.coerce.number().positive().parse(value),
            upperLimit,
            gender: z
              .preprocess(
                (val) => String(val).toUpperCase(),
                z.nativeEnum(Gender)
              )
              .parse(gender),
            ageMin: z.coerce.number().int().positive().parse(minAge),
            ageMax: z.coerce.number().int().positive().parse(maxAge),
            specialCondition: z
              .preprocess(
                (val) => String(val).toUpperCase(),
                z.nativeEnum(SpecialCondition)
              )
              .parse(specialCondition),
          });
        }
      }
    }
    return createDriStmts;
  }
}
