import { z } from "zod";
import { db } from "../../db.js";
import { builder } from "../builder.js";

// ============================================ Types ===================================
builder.prismaObject("Photo", {
  name: "Photo",
  fields: (t) => ({
    id: t.exposeID("id"),
    url: t.exposeString("path"),
    isPrimary: t.exposeBoolean("isPrimary"),
  }),
});

// ============================================ Mutations ===============================
builder.mutationFields((t) => ({
  uploadPhoto: t.prismaField({
    type: "Photo",
    args: {
      photo: t.arg({ type: "File", required: true }),
      isPrimary: t.arg.boolean({ required: true }),
    },
    resolve: async (query, root, args) => {
      const buffer = Buffer.from(await args.photo.arrayBuffer());
      return db.photo.uploadPhoto(buffer, args.isPrimary, query);
    },
  }),
  addPhotoToRecipe: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      photoId: t.arg.stringList({ required: true }),
    },
    validate: {
      schema: z.object({
        recipeId: z.string().cuid(),
        photoId: z.string().cuid().array(),
      }),
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
  removePhotoFromRecipe: t.prismaField({
    type: "Recipe",
    args: {
      recipeId: t.arg.string({ required: true }),
      photoIds: t.arg.stringList({ required: true }),
    },
    validate: {
      schema: z.object({
        recipeId: z.string().cuid(),
        photoIds: z.string().cuid().array(),
      }),
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
