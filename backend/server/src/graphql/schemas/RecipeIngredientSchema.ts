import { db } from "../../db.js";
import { RecipeIngredientsValidation } from "../../validations/RecipeValidation.js";
import { builder } from "../builder.js";

// ============================================ Types ===================================

const recipeIngredient = builder.prismaObject("RecipeIngredient", {
  name: "RecipeIngredients",
  fields: (t) => ({
    id: t.exposeString("id"),
    order: t.exposeInt("order"),
    sentence: t.exposeString("sentence"),
    quantity: t.exposeFloat("quantity", { nullable: true }),
    unit: t.relation("unit", { nullable: true }),
    name: t.exposeString("name", { nullable: true }),
    recipe: t.relation("recipe"),
    baseIngredient: t.relation("ingredient", { nullable: true }),
    group: t.relation("group", { nullable: true }),
  }),
});

// ============================================ Inputs ==================================

const recipeIngredientInput = builder.inputType("RecipeIngredientInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    order: t.int(),
    sentence: t.string(),
    quantity: t.int(),
    unitId: t.string(),
    name: t.string(),
    ingredientId: t.string(),
    groupId: t.string(),
  }),
});

// ============================================ Queries =================================

// ============================================ Mutations ===============================

builder.mutationFields((t) => ({
  addRecipeIngredient: t.prismaField({
    type: ["RecipeIngredient"],
    args: {
      recipeId: t.arg.string({ required: true }),
      ingredientTxt: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.recipeIngredient.addIngredient(
        args.ingredientTxt,
        args.recipeId
      );
      return await db.recipeIngredient.findMany({
        where: { recipeId: args.recipeId },
        ...query,
      });
    },
  }),
  deleteRecipeIngredients: t.prismaField({
    type: ["RecipeIngredient"],
    args: {
      recipeId: t.arg.string({ required: true }),
      ingredientIds: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.recipeIngredient.deleteMany({
        where: { recipeId: args.recipeId, id: { in: args.ingredientIds } },
      });
      return await db.recipeIngredient.findMany({
        where: { recipeId: args.recipeId },
        ...query,
      });
    },
  }),
  editRecipeIngredients: t.prismaField({
    type: ["RecipeIngredient"],
    args: {
      ingredients: t.arg({ type: [recipeIngredientInput], required: true }),
    },
    validate: {
      schema: RecipeIngredientsValidation,
    },
    resolve: async (query, root, args) => {
      return await db.$transaction(
        args.ingredients.map((ingredient) => {
          return db.recipeIngredient.update({
            where: { id: ingredient.id },
            data: {
              order: ingredient.order ?? undefined,
              sentence: ingredient.sentence ?? undefined,
              quantity: ingredient.quantity ?? undefined,
              unit: ingredient.unitId
                ? { connect: { id: ingredient.unitId } }
                : undefined,
              name: ingredient.name ?? undefined,
              ingredient: ingredient.ingredientId
                ? { connect: { id: ingredient.id } }
                : undefined,
              group: ingredient.groupId
                ? { connect: { id: ingredient.groupId } }
                : undefined,
            },
            ...query,
          });
        })
      );
    },
  }),
}));

export { recipeIngredient };
