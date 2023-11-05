import { PrismaClient } from "@prisma/client";
import { readCSV, readHTML } from "../services/io/Readers.js";
import { Transformer } from "../services/parsers/Transformer.js";
import { toRecipeCreateInputFromRecipeKeeper } from "../services/RecipeService.js";
import { storage } from "../storage.js";
const prisma = new PrismaClient();
const bucketPolicy =
  '{"Version":"2012-10-17","Statement":[{"Sid":"PublicReadGetObject","Effect":"Allow","Principal":"*","Action":["s3:GetObject"],"Resource":["arn:aws:s3:::$$$/*"]}]}';

(async () => {
  await deleteAllRecords();
  // await loadCourses();
  // await loadCateogries();
  // await loadCuisines();
  // await loadIngredients();
  // await loadNutrients();
  await loadRecipes();
  // await loadHealthProfile();
  // await createBuckets();
  // await deleteBuckets();
  // await createBuckets();
})()
  .then(() => {
    console.log("Seeding complete");
  })
  .catch((error) => {
    console.error(error);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });

async function deleteBuckets() {
  const buckets = await storage.listBuckets();
  for (const bucket of buckets) {
    const objectsToDelete: string[] = [];
    const stream = storage.listObjectsV2(bucket.name, "", true);
    stream.on("data", (object) => {
      objectsToDelete.push(object.name);
    });
    stream.on("end", () => {
      storage.removeObjects(bucket.name, objectsToDelete, (error) => {
        if (error) console.log(error);
        storage.removeBucket(bucket.name, (error) => {
          if (error) console.log(error);
        });
      });
    });
  }
}

async function createBuckets() {
  const buckets = ["imports", "photos"];
  for (const bucket of buckets) {
    await storage.makeBucket(bucket);
    await storage.setBucketPolicy(bucket, bucketPolicy.replace("$$$", bucket));
  }
}

async function loadHealthProfile() {
  await prisma.healthProfile.create({
    data: {
      weight: 180,
      gender: "MALE",
      bodyFatPercentage: 0.25,
      height: 72,
      yearBorn: 1994,
      activityLevel: 1.2,
      targetProtein: 0.25,
      targetCarbs: 0.5,
      targetFat: 0.5,
    },
  });
}

async function loadCateogries() {
  await prisma.category.createMany({
    data: [
      { name: "Main Dish" },
      { name: "Side Dish" },
      { name: "Dessert" },
      { name: "Appetizer" },
      { name: "Salad" },
      { name: "Bread" },
      { name: "Soup" },
      { name: "Beverage" },
      { name: "Sauce/Dressing" },
    ],
  });
}

async function loadCourses() {
  await prisma.course.createMany({
    data: [
      { name: "Breakfast" },
      { name: "Lunch" },
      { name: "Dinner" },
      { name: "Snack" },
    ],
  });
}

async function loadCuisines() {
  await prisma.cuisine.createMany({
    data: [
      { name: "Italian" },
      { name: "Chinese" },
      { name: "Japanese" },
      { name: "Mexican" },
      { name: "Indian" },
      { name: "French" },
      { name: "Spanish" },
      { name: "Thai" },
      { name: "Mediterranean" },
      { name: "Middle Eastern" },
      { name: "Korean" },
      { name: "Vietnamese" },
      { name: "Greek" },
      { name: "American" },
      { name: "Brazilian" },
    ],
  });
}

async function loadNutrients() {
  // Load in Nutrients
  const transformer = new Transformer();
  const nutrients = await readCSV("../../data/nutrients.csv");
  const mineralDRI = await readCSV("../../data/FDA/minerals.csv");
  const vitaminDRI = await readCSV("../../data/FDA/vitamins.csv");
  const dris = [...mineralDRI, ...vitaminDRI];
  const idLookup: { [key: string]: string } = {};
  for (const nutrient of transformer.toNutrientAndDRI(nutrients, dris)) {
    const record = await prisma.nutrient.create({
      data: nutrient,
    });
    idLookup[record.name] = record.id;
  }

  // Create self references for nutrients
  for (const nutrient of nutrients) {
    if (nutrient.parentNutrient in idLookup) {
      await prisma.nutrient.update({
        where: {
          id: idLookup[nutrient.nutrient],
        },
        data: {
          parentNutrient: {
            connect: {
              id: idLookup[nutrient.parentNutrient],
            },
          },
        },
      });
    }
  }
}

async function loadIngredients() {
  // Load in Ingredients
  const transformer = new Transformer();
  const ingredients = await readCSV("../../data/Ingredients.csv");
  // for (const ingredient of ingredients) {
  await prisma.ingredient.createMany({
    data: ingredients.map((ingredient) => transformer.toIngredient(ingredient)),
    skipDuplicates: true,
  });
  // }
}

export async function deleteAllRecords() {
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log(error);
  }
}

async function loadRecipes() {
  const recipes = readHTML("../../data/RecipeKeeper/recipes.html");
  const createStmts = await toRecipeCreateInputFromRecipeKeeper(
    prisma,
    recipes
  );

  for (const createStmt of createStmts) {
    await prisma.recipe.create({
      data: createStmt,
    });
  }
}
