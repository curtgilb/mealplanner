import { builder } from "../builder.js";
import { Prisma } from "@prisma/client";
import { db } from "../../db.js";
import { toTitleCase } from "../../util/utils.js";

// ============================================ Types ===================================

builder.prismaObject("Cuisine", {
  name: "Cuisine",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    recipes: t.relation("recipes"),
  }),
});

builder.prismaObject("Category", {
  name: "Category",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    recipes: t.relation("recipes"),
  }),
});

builder.prismaObject("Course", {
  name: "Course",
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    recipes: t.relation("recipes"),
  }),
});

builder.prismaObject("Photo", {
  name: "Photo",
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("path"),
    isPrimary: t.exposeBoolean("isPrimary"),
  }),
});

// ============================================ Inputs ==================================

// ============================================ Queries =================================
builder.queryFields((t) => ({
  cuisines: t.prismaField({
    type: ["Cuisine"],
    args: {
      searchString: t.arg.string(),
    },
    resolve: async (query, root, args) => {
      const search: Prisma.CuisineFindManyArgs = { ...query };
      if (args.searchString) {
        search.where = {
          name: {
            contains: args.searchString,
            mode: "insensitive",
          },
        };
      }
      return await db.cuisine.findMany(search);
    },
  }),
  categories: t.prismaField({
    type: ["Category"],
    args: {
      searchString: t.arg.string(),
    },
    resolve: async (query, root, args) => {
      return await db.category.findMany({
        where: {
          name: args.searchString
            ? { contains: args.searchString, mode: "insensitive" }
            : undefined,
        },
      });
    },
  }),
  courses: t.prismaField({
    type: ["Course"],
    args: {
      searchString: t.arg.string(),
    },
    resolve: async (query, root, args) => {
      const search: Prisma.CourseFindManyArgs = { ...query };
      if (args.searchString) {
        search.where = {
          name: {
            contains: args.searchString,
            mode: "insensitive",
          },
        };
      }
      return await db.course.findMany(search);
    },
  }),
}));

// ============================================ Mutations ===============================

builder.mutationFields((t) => ({
  createCuisine: t.prismaField({
    type: ["Cuisine"],
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.cuisine.create({ data: { name: args.name } });
      return db.cuisine.findMany({ ...query });
    },
  }),
  deleteCuisine: t.prismaField({
    type: ["Cuisine"],
    args: {
      cuisineId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.cuisine.delete({ where: { id: args.cuisineId } });
      return await db.cuisine.findMany({ ...query });
    },
  }),
  createCategory: t.prismaField({
    type: ["Category"],
    args: {
      name: t.arg.string({
        required: true,
      }),
    },
    resolve: async (query, root, args) => {
      await db.category.create({ data: { name: args.name } });
      return await db.category.findMany({ ...query });
    },
  }),
  deleteCategory: t.prismaField({
    type: ["Category"],
    args: {
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.category.delete({ where: { id: args.categoryId } });
      return await db.category.findMany({ ...query });
    },
  }),
  createCourse: t.prismaField({
    type: ["Course"],
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.category.create({ data: { name: args.name } });
      return await db.category.findMany({ ...query });
    },
  }),
  deleteCourse: t.prismaField({
    type: ["Course"],
    args: {
      courseId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      await db.course.delete({ where: { id: args.courseId } });
      return await db.course.findMany({ ...query });
    },
  }),
  changeRecipeCuisine: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      cuisineId: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          cuisine: { set: args.cuisineId.map((id) => ({ id })) },
        },
        ...query,
      });
    },
  }),
  removeRecipeCuisine: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      cuisineId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          cuisine: {
            disconnect: { id: args.cuisineId },
          },
        },
        ...query,
      });
    },
  }),
  addCategoryToRecipe: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      category: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      const categoryName = toTitleCase(args.category);
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          category: {
            connectOrCreate: {
              where: {
                name: categoryName,
              },
              create: {
                name: categoryName,
              },
            },
          },
        },
        ...query,
      });
    },
  }),
  removeCategoryFromRecipe: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      categoryId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          category: {
            disconnect: [{ id: args.categoryId }],
          },
        },
        ...query,
      });
    },
  }),
  addRecipeCourse: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      course: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      const courseName = toTitleCase(args.course);
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          course: {
            connectOrCreate: {
              where: {
                name: courseName,
              },
              create: {
                name: courseName,
              },
            },
          },
        },
        ...query,
      });
    },
  }),
  removeCourseFromRecipe: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      courseId: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          course: {
            disconnect: [{ id: args.courseId }],
          },
        },
        ...query,
      });
    },
  }),
  uploadPhoto: t.prismaField({
    type: "Photo",
    args: {
      photo: t.arg({ type: "File", required: true }),
    },
    resolve: async (query, root, args) => {
      const buffer = Buffer.from(await args.photo.arrayBuffer());
      return db.photo.uploadPhoto(buffer, args.photo.name, query);
    },
  }),
  addRecipePhotos: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      photoId: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          photos: {
            connect: args.photoId.map((id) => ({ id })),
          },
        },
        ...query,
      });
    },
  }),
  removeRecipePhotos: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      photoIds: t.arg.stringList({ required: true }),
    },
    resolve: async (query, root, args) => {
      return await db.recipe.update({
        where: { id: args.recipeId },
        data: {
          photos: {
            disconnect: args.photoIds.map((id) => ({ id })),
          },
        },
        ...query,
      });
    },
  }),
}));
