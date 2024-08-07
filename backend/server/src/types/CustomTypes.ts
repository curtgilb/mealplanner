import { Prisma, RecordStatus } from "@prisma/client";
import { MealPlanRecipeWithServing } from "../../data/test_data/MealPlan.js";
import { SummedNutrients } from "../services/nutrition/LabelAggregator.js";
import { AggregateNutritionLabel } from "../services/nutrition/LabelMaker.js";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type ImageMapping = { [key: string]: string };
    type NutrientMapping = { [key: string]: NutrientValue };
    type MealPlanRecipesCopy = MealPlanRecipeWithServing[];
    type BoundingBoxes = BoundingBox[];
    type SummedNutrientMapJson = SummedNutrients;
    type AggregateLabelJson = AggregateNutritionLabel;
  }
}

type PolygonCoordinate = {
  x: number;
  y: number;
};

type BoundingBox = PolygonCoordinate[];

type NutrientValue = { value: number; valuePerServing: number };

type MatchArgs = {
  recipeMatchId?: string | undefined;
  labelMatchId?: string | undefined;
  ingredientGroupId?: string | undefined;
  status?: RecordStatus;
};

type Match = {
  recipeMatchId?: string | undefined;
  labelMatchId?: string | undefined;
  ingredientGroupId?: string | undefined;
  status: RecordStatus;
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
  nutrients: { name: string; value: string }[];
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

const recordWithImport = Prisma.validator<Prisma.ImportItemDefaultArgs>()({
  include: {
    import: true,
  },
});

type RecordWithImport = Prisma.ImportItemGetPayload<typeof recordWithImport>;

const recipeWithIngredients = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  include: {
    ingredients: true,
  },
});

type RecipeWithIngredients = Prisma.RecipeGetPayload<
  typeof recipeWithIngredients
>;

const nutritionLabelWithNutrients =
  Prisma.validator<Prisma.NutritionLabelDefaultArgs>()({
    include: {
      nutrients: true,
      servingSizeUnit: true,
    },
  });

type LabelWithNutrients = Prisma.NutritionLabelGetPayload<
  typeof nutritionLabelWithNutrients
>;

const nutrientWithUnit = Prisma.validator<Prisma.NutrientDefaultArgs>()({
  include: {
    unit: true,
    dri: true,
  },
});

type NutrientWithUnit = Prisma.NutrientGetPayload<typeof nutrientWithUnit>;

export {
  RecordWithImport,
  RecipeWithIngredients,
  RecipeKeeperRecipe,
  Mappings,
  FileMetaData,
  CronometerNutrition,
  LabelWithNutrients,
  MyFitnessPalNutrition,
  ImportQuery,
  Match,
  NutrientWithUnit,
  NutrientValue,
  MatchArgs,
  BoundingBox,
};
