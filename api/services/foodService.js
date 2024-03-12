const { default: axios } = require("axios");
const DiaryDay = require("../models/DiaryDay");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

const openFoodFactsAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org",
});

//Is it bad to have this type of synchronosity in the backend???
function extractIngredients(data) {
  let ingredientsSet = new Set();

  function cleanText(text) {
    // Remove underscores, trim whitespace, and correct the casing if necessary
    return text.replace(/_/g, "").trim(); // Add more replacements as needed
  }

  function traverse(ingredientList) {
    ingredientList?.forEach((ingredient) => {
      if (ingredient.ingredients) {
        traverse(ingredient.ingredients);
      } else if (ingredient.text) {
        ingredientsSet.add(cleanText(ingredient.text));
      }
    });
  }

  traverse(data);

  return Array.from(ingredientsSet);
}

async function checkIsInGroceryList(userId, identifier, isBarcode = true) {
  const groceries = await Grocery.findOne({ userId: userId }).populate(
    "groceries.item"
  );
  if (!groceries) return false;

  return groceries.groceries.some((groceryItem) =>
    isBarcode
      ? groceryItem.item.barcode === identifier
      : groceryItem.item._id.toString() === identifier
  );
}

async function checkIsConsumedToday(userId, identifier, isBarcode = true) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: today,
  }).populate(isBarcode ? "consumedFoods" : "consumedSingleFoods");
  if (!diaryDay) return false;

  return diaryDay[isBarcode ? "consumedFoods" : "consumedSingleFoods"].some(
    (foodItem) =>
      isBarcode
        ? foodItem.barcode === identifier
        : foodItem._id.toString() === identifier
  );
}

async function fetchOFFWithBarcode({ userId, barcode }) {
  const response = await openFoodFactsAPI.get(`/api/v3/product/${barcode}`);
  const product = response.data.product;
  const ingredients = extractIngredients(product?.ingredients);
  const additives = product.additives_tags.map((ing) => ing.split(":")[1]);

  const isInGroceryList = await checkIsInGroceryList(userId, barcode, true);
  const isConsumedToday = await checkIsConsumedToday(userId, barcode, true);

  const hasPalmOil = product.ingredients_analysis_tags.includes("en:palm-oil")
    ? "Yes"
    : product.ingredients_analysis_tags.includes("en:palm-oil-content-unknown")
    ? "Unknown"
    : "No";

  return {
    name: product.product_name,
    processedScore: 100 - (product.nova_group - 1) * 25,
    brand: product.brands,
    image_url: product.image_url,
    ingredients: ingredients,
    additives: additives,
    barcode: barcode,
    isConsumedToday,
    isInGroceryList,
    hasPalmOil,
    co2Footprint: product.ecoscore_data.agribalyse?.co2_total,
  };
}

async function fetchOFFWithSearch({ search_term }) {
  const response = await openFoodFactsAPI.get("/cgi/search.pl", {
    params: {
      action: "process",
      search_terms: search_term,
      sort_by: "popularity_key",
      page_size: 20,
      countries_tags: "united-kingdom",
      json: 1,
    },
  });

  // Maybe return empty array instead so dont need to throw error?
  if (!response) throw new NotFoundError("No search results for this search term");

  const products = response.data.products;

  const foodList = products.map((product) => {
    const processedScore = 100 - (product.nova_group - 1) * 25;
    return {
      name: product.product_name,
      processedScore: processedScore,
      brand: product.brands,
      image_url: product.image_url,
      barcode: product.code,
    };
  });

  return foodList;
}

async function fetchSingleFoodsWithSearch({ searchTerm }) {
  const searchStage = {
    $search: {
      autocomplete: {
        query: searchTerm,
        fuzzy: {
          maxEdits: 2,
          prefixLength: 3,
        },
        path: "name",
        tokenOrder: "sequential",
      },
    },
  };

  const results = await SingleFood.aggregate([
    searchStage,
    {
      $limit: 10,
    },
    {
      $project: { name: 1, image_url: 1, processedScore: 1 }, // Adjust based on the fields you want to return
    },
  ]);

  return results;
}

async function fetchSingleFoodsWithIvyId({ IvyId, userId }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const singleFood = await SingleFood.findById(IvyId).lean();

  if (!singleFood) throw new Error("No single food with this IvyId");

  const isInGroceryList = await checkIsInGroceryList(userId, IvyId, false);
  const isConsumedToday = await checkIsConsumedToday(userId, IvyId, false);

  return { singleFood, isConsumedToday, isInGroceryList };
}

module.exports = {
  fetchOFFWithBarcode,
  fetchOFFWithSearch,
  fetchSingleFoodsWithSearch,
  fetchSingleFoodsWithIvyId,
};
