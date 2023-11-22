import { Prisma } from "@prisma/client";

type RecipeNlpResponse = {
  sentence: string;
  quantity: number;
  unit: string;
  name: string;
  comment: string;
  preparation: string;
  other: string;

  minQty?: number;
  maxQty?: number;
  matchedIngredient?: string;
};

type RecipeKeeperRecipe = {
  recipeId: string;
  recipeShareId: string;
  recipeIsFavourite: string;
  recipeRating: string;
  name: string;
  recipeSource: string;
  recipeYield: string;
  prepTime: string;
  cookTime: string;
  recipeIngredients: string;
  recipeDirections: string;
  recipeNotes: string;
  nutritionServingSize: string;
  // recipeNutServingSize: string;
  // recipeNutCalories: string;
  // recipeNutTotalFat: string;
  // recipeNutSaturatedFat: string;
  // recipeNutSodium: string;
  // recipeNutTotalCarbohydrate: string;
  // recipeNutSugars: string;
  // recipeNutProtein: string;
  // recipeNutCholesterol: string;
  // recipeNutDietaryFiber: string;
  nutrients: Nutrient[];
  recipeCourse: string[];
  photos: string[];
  recipeCollection: string[];
  recipeCategory: string[];
  rawInput: string;
};

type CronometerNutrition = {
  day: Date;
  time: string;
  group: string;
  foodName: string;
  amount?: number;
  unit?: string;
  category: string;
  rawInput: string;
  nutrients: Nutrient[];
};

type MyFitnessPalNutrition = {
  date: Date;
  meal: string;
  note: string;
  nutrients: Nutrient[];
};

type Nutrient = {
  id: string;
  amount: number;
};

type ImportQuery = {
  include?: Prisma.ImportInclude | undefined;
  select?: Prisma.ImportSelect | undefined;
};

// type Ingredient = {
//   name: string;
//   storageInstructions: string;
//   alternativeNames?: string[];
//   perishable: boolean;
//   fridgeLife: number;
//   freezerLife: number;
//   defrostTime: number;
//   category: string;
// };

// type Nutrient = {
//   nutrient: string;
//   symbol: string;
//   unit: string;
//   notes: string;
//   alternateNames: string[];
//   type: string;
//   parentNutrient: string;
//   cronometer: string;
//   recipeKeeper: string;
//   myFitnessPal: string;
//   dri: string;
// };

// type NutritionLabel = {
//   name: string;
//   alcohol?: number;
//   amount?: string;
//   nutrients: NutritionFact[];
// };

// type NutritionFact = {
//   nutrient: string;
//   amount: number;
// };

// type DriLookup = { [key: string]: DailyRecommendedIntake[] };

// type DailyRecommendedIntake = {
//   gender: Gender;
//   ageMin: number;
//   ageMax: number;
//   specialCondition: SpecialCondition;
//   value: number;
// };

type Mappings = {
  nutrientName: { [key: string]: string };
};

type FileMetaData = {
  path: string;
  name: string;
  ext: string;
};

export {
  RecipeNlpResponse,
  RecipeKeeperRecipe,
  Mappings,
  FileMetaData,
  CronometerNutrition,
  MyFitnessPalNutrition,
  ImportQuery,
  // Ingredient,
  // Nutrient,
  // NutritionFact,
  // NutritionLabel,
  // DailyRecommendedIntake,
  // DriLookup,
};
