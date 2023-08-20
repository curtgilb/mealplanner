import fs from "fs";
import {
  Ingredient,
  Nutrient,
  Mappings,
  DailyRecommendedIntake,
  DriLookup,
} from "./ImportTypes.js";
import { toCamelCase } from "../util/utils";
import path from "path";
import {
  Gender,
  NutrientType,
  Prisma,
  SpecialCondition,
  DayOfWeek,
  NutritionLabel,
} from "@prisma/client";

// The purpose of this class is to take data read in from reading csv, html, etc, files and transform them so that they are ready to be inserted into the database.
export class Transformer {
  toNumber(value: string): number | undefined {
    const parsedFloat = parseFloat(value);
    const parsedInt = parseInt(value, 10);

    if (!isNaN(parsedFloat)) {
      return parsedFloat;
    } else if (!isNaN(parsedInt)) {
      return parsedInt;
    } else {
      throw new Error(`Unable to convert ${value} to a number`);
    }
  }
  toBoolean(value: string): boolean {
    if (value.toLowerCase() === "true" || value === "1") {
      return true;
    } else if (value.toLowerCase() === "false" || value === "0") {
      return false;
    } else {
      throw new Error(`Unable to convert ${value} to a boolean`);
    }
  }

  getTime(input: string): number {
    const match = Array.from(input.matchAll(/(?<time>\d+)(?<unit>.)/gm))[0];
    const time: number = parseInt(match.groups.time);
    const unit: string = match.groups.unit;
    if (unit === "S") {
      return time / 60;
    } else if (unit === "H") {
      return time * 60;
    } else {
      return time;
    }
  }

  toGenderEnum(value: string): Gender {
    let gender = this.cast(value) as string;
    if (gender !== undefined) {
      gender = gender.toUpperCase();
      if (["M", "MALE"].includes(gender)) return "MALE";
      else if (["F", "FEMALE"].includes(gender)) return "FEMALE";
    }
    throw new Error(`Unable to convert ${value} to a gender`);
  }

  toSpecialConditionEnum(value: string): SpecialCondition {
    let specialCondition = this.cast(value) as string;
    if (specialCondition !== undefined) {
      specialCondition = specialCondition.toUpperCase();
      if (["PREGNANT"].includes(specialCondition)) return "PREGNANT";
      else if (["LACTATING"].includes(specialCondition)) return "LACTATING";
      else return "NONE";
    }
    throw new Error(`Unable to convert ${value} to a special condition`);
  }

  toDayOfWeekEnum(value: string): DayOfWeek {
    let dayOfWeek = this.cast(value) as string;
    if (dayOfWeek !== undefined) {
      dayOfWeek = dayOfWeek.toUpperCase();
      if (["MONDAY", "MON"].includes(dayOfWeek)) return "MONDAY";
      else if (["TUESDAY", "TUES"].includes(dayOfWeek)) return "TUESDAY";
      else if (["WEDNESDAY", "WED"].includes(dayOfWeek)) return "WEDNESDAY";
      else if (["THURSDAY", "THURS"].includes(dayOfWeek)) return "THURSDAY";
      else if (["FRIDAY", "FRI"].includes(dayOfWeek)) return "FRIDAY";
      else if (["SATURDAY", "SAT"].includes(dayOfWeek)) return "SATURDAY";
      else if (["SUNDAY", "SUN"].includes(dayOfWeek)) return "SUNDAY";
    }
    throw new Error(`Unable to convert ${value} to a day of week`);
  }

  createMappings(nutrients: { [key: string]: string }[]): Mappings {
    // Create mappings from import names to nutrient names
    const mappings: Mappings = {
      myFitnessPal: {},
      recipeKeeper: {},
      cronometer: {},
      dri: {},
    };
    nutrients.reduce(
      (
        accumulation: Mappings,
        current: { [key: string]: string }
      ): Mappings => {
        if (current.recipeKeeper !== undefined) {
          accumulation.recipeKeeper[current.recipeKeeper] = current.nutrient;
        }
        if (current.cronometer !== undefined) {
          accumulation.cronometer[current.cronometer] = current.nutrient;
        }
        if (current.dri !== undefined) {
          accumulation.dri[current.dri] = current.nutrient;
        }
        if (current.myFitnessPal !== undefined) {
          accumulation.myFitnessPal[current.myFitnessPal] = current.nutrient;
        }
        return accumulation;
      },
      mappings
    );

    return mappings;
  }

  cast(str: string): string | number | boolean | undefined {
    if (str === "" || str === undefined || str === null) {
      return undefined;
    }
    // Check if number
    if (!isNaN(parseFloat(str)) && !isNaN(parseInt(str, 10))) {
      return this.toNumber(str);
      // Check if boolean
    } else if (["true", "false", "0", "1"].includes(str.toLowerCase())) {
      return this.toBoolean(str);

      // Else, return string
    } else {
      return str;
    }
  }
  // In order to create with alternate names, records must be create one at a time (i.e., no createMany)
  toIngredient(record: {
    [key: string]: string;
  }): Prisma.IngredientCreateInput {
    const ingredient: Prisma.IngredientCreateInput = {
      name: this.cast(record.name) as string,
      storageInstructions: this.cast(record.storageInstructions) as string,
    };
    if ((this.cast(record.alternateNames) as string) !== undefined) {
      ingredient.alternateNames = {
        createMany: {
          data: (this.cast(record.alternateNames) as string)
            .split(",")
            .map((name) => ({ name })),
        },
      };
    }
    return ingredient;
  }

  createDriLookup(
    dailyRecommendedIntake: { [key: string]: string }[]
  ): DriLookup {
    const driLookup: DriLookup = {};
    // each row in nutrients.csv
    dailyRecommendedIntake.forEach((dri) => {
      // properties that are not nutrients
      const { gender, minAge, maxAge, specialCondition, ...rest } = dri;
      for (const [nutrient, recomendation] of Object.entries(rest)) {
        if (!(nutrient in driLookup)) {
          driLookup[nutrient] = [];
        }
        driLookup[nutrient].push({
          gender: this.toGenderEnum(gender),
          ageMin: this.cast(minAge) as number,
          ageMax: this.cast(maxAge) as number,
          specialCondition: this.toSpecialConditionEnum(specialCondition),
          value: this.cast(recomendation) as number,
        });
      }
    });
    return driLookup;
  }

  toNutrientAndDRI(
    nutrients: { [key: string]: string }[],
    dailyRecommendedIntake: { [key: string]: string }[]
  ): Prisma.NutrientCreateInput[] {
    const driLookup = this.createDriLookup(dailyRecommendedIntake);

    return nutrients.map((record) => {
      const alternateNames = this.cast(record.alternateNames) as string;
      const nutrientRecord = {
        name: this.cast(record.nutrient) as string,
        unit: this.cast(record.unit) as string,
        unitAbbreviation: this.cast(record.unitAbbreviation) as string,
        alternateNames:
          alternateNames === undefined ? undefined : alternateNames.split(","),
        type: (this.cast(record.type) as string).toUpperCase() as NutrientType,
        customTarget: false,
      };

      const driLookupValue = this.cast(record.driMapping) as string;
      if (driLookupValue !== undefined) {
        nutrientRecord["dri"] = {
          createMany: {
            data: driLookup[driLookupValue],
          },
        };
      }
      return nutrientRecord;
    });
  }

  toNutritionLabel(
    csvData: {
      [key: string]: string;
    },
    nutrientNameMap: Mappings,
    nutrientIdMap: { [key: string]: string }
  ): Prisma.NutritionLabelCreateInput {
    const { day, time, group, foodName, amount, category, ...rest } = csvData;
    return {
      name: this.cast(foodName) as string,
      amount: this.cast(amount) as string,
      source: "CRONOMETER",
      nutritionLabelNutrients: {
        create: Object.entries(rest).map(([nutrient, recomendation]) => {
          return {
            value: this.cast(recomendation) as number,
            nutrient: {
              connect: {
                id: nutrientIdMap[nutrientNameMap.cronometer[nutrient]],
              },
            },
          };
        }),
      },
    };
  }
}
