import { builder } from "../builder.js";
import { processRecipeKeeperImport } from "../../services/import/RecipeKeeperImport.js";
import { processCronometerImport } from "../../services/import/CronometerImport.js";

// ============================================ Types ===================================
builder.prismaObject("Import", {
  fields: (t) => ({
    id: t.exposeID("id"),
    fileName: t.exposeString("fileName"),
    type: t.exposeString("type"),
    status: t.exposeString("status"),
    url: t.exposeString("path"),
    records: t.relation("importRecords"),
    recordsCount: t.relationCount("importRecords"),
  }),
});

builder.prismaObject("ImportRecord", {
  fields: (t) => ({
    name: t.exposeString("name"),
    status: t.exposeString("status"),
    recipe: t.relation("recipe"),
    nutritionLabel: t.relation("nutritionLabel"),
  }),
});
// ============================================ Inputs ==================================

// ============================================ Queries =================================

// ============================================ Mutations ===============================

builder.mutationFields((t) => ({
  importRecipeKeeper: t.prismaField({
    type: "Import",
    args: {
      file: t.arg({
        type: "File",
        required: true,
      }),
    },
    resolve: async (query, root, args) => {
      return await processRecipeKeeperImport(args.file, query);
    },
  }),
  importCronometer: t.prismaField({
    type: "Import",
    args: {
      file: t.arg({
        type: "File",
        required: true,
      }),
    },
    resolve: async (query, root, { file }) => {
      return await processCronometerImport(file);
    },
  }),
}));
