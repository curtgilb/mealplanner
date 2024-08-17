import { builder } from "./builder.js";

import "./schemas/CategorySchema.js";
import "./schemas/CourseSchema.js";
import "./schemas/CuisineSchema.js";
import "./schemas/EnumSchema.js";
import "./schemas/ExpirationRuleSchema.js";
import "./schemas/GroceryStoreSchema.js";
import "./schemas/NutrientRankSchema.js";
import "./schemas/NutrientTargetSchema.js";
import "./schemas/ReceiptLineSchema.js";
import "./schemas/RecipeIngredientSchema.js";
// import "./schemas/ImportSchema.js";
import "./schemas/IngredientCategorySchema.js";
import "./schemas/IngredientPrice.js";
import "./schemas/IngredientSchema.js";
import "./schemas/MealPlanIngredients.js";
import "./schemas/MealPlanRecipeSchema.js";
import "./schemas/MealplanSchema.js";
import "./schemas/MealPlanServingsSchema.js";
import "./schemas/MeasurementUnitSchema.js";
import "./schemas/NutrientSchema.js";
import "./schemas/NutritionLabelSchema.js";
import "./schemas/PhotoSchema.js";
import "./schemas/ReceiptSchema.js";
import "./schemas/RecipeSchema.js";
import "./schemas/UserSchema.js";
import "./schemas/UtilitySchema.js";
import "./schemas/MacroSchema.js";
import "./schemas/RecipeIngredientGroup.js";

export const schema = builder.toSchema();
