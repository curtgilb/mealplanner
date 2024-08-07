import { queryFromInfo } from "@pothos/plugin-prisma";
import { ExpirationRule, Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "../../db.js";
import {
  createExpirationRuleValidation,
  editExpirationRuleValidation,
} from "../../validations/IngredientValidation.js";
import { offsetPaginationValidation } from "../../validations/UtilityValidation.js";
import { builder } from "../builder.js";
import {
  deleteResult,
  nextPageInfo,
  offsetPagination,
} from "./UtilitySchema.js";

const expRule = builder.prismaObject("ExpirationRule", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    variation: t.exposeString("variant", { nullable: true }),
    defrostTime: t.exposeInt("defrostTime", { nullable: true }),
    perishable: t.exposeBoolean("perishable", { nullable: true }),
    tableLife: t.exposeInt("tableLife", { nullable: true }),
    fridgeLife: t.exposeInt("fridgeLife", { nullable: true }),
    freezerLife: t.exposeInt("freezerLife", { nullable: true }),
    longestLife: t.int({
      nullable: true,
      resolve: (rule) => {
        const lifes = [
          rule.tableLife,
          rule.fridgeLife,
          rule.freezerLife,
        ].filter((lifespan) => lifespan) as number[];
        return Math.max(...lifes);
      },
    }),
  }),
});

// const rulesQuery = builder
//   .objectRef<{
//     nextOffset: number | null;
//     itemsRemaining: number;
//     rules: ExpirationRule[];
//   }>("ExpirationRulesQuery")
//   .implement({
//     fields: (t) => ({
//       nextOffset: t.exposeInt("nextOffset", { nullable: true }),
//       itemsRemaining: t.exposeInt("itemsRemaining"),
//       items: t.field({
//         type: [expRule],
//         resolve: (result) => result.rules,
//       }),
//     }),
//   });

// ============================================ Inputs ==================================

const createExpirationRule = builder.inputType("CreateExpirationRuleInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    variation: t.string(),
    defrostTime: t.float(),
    perishable: t.boolean(),
    tableLife: t.int({ required: true }),
    fridgeLife: t.int({ required: true }),
    freezerLife: t.int({ required: true }),
    ingredientId: t.id(),
  }),
});

const editExpirationRule = builder.inputType("EditExpirationRuleInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    name: t.string(),
    variation: t.string(),
    defrostTime: t.float(),
    perishable: t.boolean(),
    tableLife: t.int(),
    fridgeLife: t.int(),
    freezerLife: t.int(),
    ingredientId: t.id(),
  }),
});

// ============================================ Queries =================================
builder.queryFields((t) => ({
  expirationRule: t.prismaField({
    type: "ExpirationRule",
    args: {
      expirationRuleId: t.arg.string({ required: true }),
    },
    validate: {
      schema: z.object({ expirationRuleId: z.string().cuid() }),
    },
    resolve: async (query, root, args) => {
      return await db.expirationRule.findUniqueOrThrow({
        where: { id: args.expirationRuleId },
        ...query,
      });
    },
  }),
  expirationRules: t.prismaField({
    type: ["ExpirationRule"],
    args: {
      search: t.arg.string(),
      // pagination: t.arg({ type: offsetPagination, required: true }),
    },
    validate: {
      schema: z.object({
        search: z.string().optional(),
        // pagination: offsetPaginationValidation,
      }),
    },
    resolve: async (query) => {
      // const where: Prisma.ExpirationRuleWhereInput = args.search
      //   ? {
      //       name: { contains: args.search, mode: "insensitive" },
      //     }
      //   : {};
      // const [data, count] = await db.$transaction([
      //   db.expirationRule.findMany({
      //     where,
      //     take: args.pagination.take,
      //     skip: args.pagination.offset,
      //     orderBy: { name: "asc" },
      //     ...queryFromInfo({ context, info, path: ["ingredients"] }),
      //   }),
      //   db.expirationRule.count({ where }),
      // ]);
      // const { itemsRemaining, nextOffset } = nextPageInfo(
      //   data.length,
      //   args.pagination.take,
      //   args.pagination.offset,
      //   count
      // );
      // return { itemsRemaining, nextOffset, rules: data };
      return await db.expirationRule.findMany({ ...query });
    },
  }),
}));

// ============================================ Mutations =================================
builder.mutationFields((t) => ({
  createExpirationRule: t.prismaField({
    type: "ExpirationRule",
    args: {
      rule: t.arg({ type: createExpirationRule, required: true }),
    },
    validate: {
      schema: z.object({
        ingredientId: z.string().cuid(),
        rule: createExpirationRuleValidation,
      }),
    },
    resolve: async (query, root, args) => {
      return await db.expirationRule.create({
        data: {
          name: args.rule.name,
          variant: args.rule.variation,
          defrostTime: args.rule.defrostTime,
          perishable: args.rule.perishable,
          tableLife: args.rule.tableLife,
          fridgeLife: args.rule.fridgeLife,
          freezerLife: args.rule.freezerLife,
        },
        ...query,
      });
    },
  }),
  connectExpirationRule: t.prismaField({
    type: "Ingredient",
    args: {
      ingredientId: t.arg.string({ required: true }),
      expirationRuleId: t.arg.string({ required: true }),
    },
    validate: {
      schema: z.object({
        ingredientId: z.string().cuid(),
        expirationRuleId: z.string().cuid(),
      }),
    },
    resolve: async (query, root, args) => {
      return await db.ingredient.update({
        where: {
          id: args.ingredientId,
        },
        data: {
          expirationRule: {
            connect: {
              id: args.expirationRuleId,
            },
          },
        },
        ...query,
      });
    },
  }),
  editExpirationRule: t.prismaField({
    type: "ExpirationRule",
    args: {
      expirationRule: t.arg({ type: editExpirationRule, required: true }),
    },
    validate: {
      schema: z.object({
        expirationRule: editExpirationRuleValidation,
      }),
    },
    resolve: async (query, root, args) => {
      return await db.expirationRule.update({
        where: {
          id: args.expirationRule.id,
        },
        data: {
          defrostTime: args.expirationRule.defrostTime,
          perishable: args.expirationRule.perishable,
          tableLife: args.expirationRule.tableLife,
          fridgeLife: args.expirationRule.fridgeLife,
          freezerLife: args.expirationRule.freezerLife,
        },
      });
    },
  }),
  deleteExpirationRule: t.field({
    type: deleteResult,
    args: {
      expirationRuleId: t.arg.string({ required: true }),
    },
    validate: {
      schema: z.object({ expirationRuleId: z.string().cuid() }),
    },
    resolve: async (root, args) => {
      try {
        await db.expirationRule.delete({
          where: {
            id: args.expirationRuleId,
          },
        });
      } catch (e) {
        return { success: false, message: e instanceof Error ? e.message : "" };
      }
      return { success: true };
    },
  }),
}));
