import { z } from "zod";
import { cleanedStringSchema } from "../utilValidations.js";
import { toTitleCase } from "../../util/utils.js";

const createNutrientValidation = z.object({
  nutrientId: z.string().cuid(),
  value: z.number().positive(),
});

const createNutritionLabelValidation = z.object({
  name: cleanedStringSchema(30, toTitleCase),
  ingredientGroupId: z.string().cuid().optional().nullish(),
  servings: z.number().gte(1),
  servingSize: z.number().positive().optional().nullish(),
  servingSizeUnitId: z.string().cuid().optional().nullish(),
  servingsUsed: z.number().positive().optional().nullish(),
  isPrimary: z.boolean().optional(),
  nutrients: z.array(createNutrientValidation),
});

const editNutritionLabelValidation = z.object({
  id: z.string().cuid(),
  name: cleanedStringSchema(30, toTitleCase).optional(),
  servings: z.number().positive().optional(),
  servingSize: z.number().positive().optional().nullish(),
  servingSizeUnitId: z.string().cuid().optional().nullish(),
  servingsUsed: z.number().positive().optional().nullish(),
  isPrimary: z.boolean().optional(),
  nutrients: z.array(createNutrientValidation).optional(),
});

export {
  createNutritionLabelValidation,
  editNutritionLabelValidation,
  createNutrientValidation,
};
