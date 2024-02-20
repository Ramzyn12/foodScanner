// Endpoint to fetch food details by barcode
const axios = require("axios");
const DiaryDay = require("../models/DiaryDay");

const openFoodFactsAPI = axios.create({
  baseURL: "https://world.openfoodfacts.org",
});

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

const fetchFoodWithBarcode = async (req, res) => {
  const barcode = req.params.barcode;
  const user = req.user._id; // Assuming you have user information from authentication middleware

  const response = await openFoodFactsAPI.get(`/api/v3/product/${barcode}`);
  const product = response.data.product;
  const ingredients = extractIngredients(product?.ingredients);
  const additives = product.additives_tags.map((ing) => ing.split(":")[1]);

  // Set today's date (with time part removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to make sure it's the start of the day

  // Find the diary entry for the user for the specific date
  const diaryDay = await DiaryDay.findOne({
    userId: user,
    date: today,
  }).populate("consumedFoods");

  // Check if the scanned food is already part of the consumed foods
  const isConsumedToday =
    diaryDay &&
    diaryDay.consumedFoods.some((foodItem) => foodItem.barcode === barcode);

  const processedScore = 100 - (product.nova_group - 1) * 25;

  res.json({
    name: product.product_name,
    processedScore: processedScore,
    brand: product.brands,
    image_url: product.image_url,
    ingredients: ingredients,
    additives: additives,
    barcode: barcode,
    isConsumedToday: isConsumedToday,
    hasPalmOil: product.ingredients_analysis_tags.includes("en:palm-oil")
      ? "Yes"
      : product.ingredients_analysis_tags.includes(
          "en:palm-oil-content-unknown"
        )
      ? "Unknown"
      : "No",
    co2Footprint: product.ecoscore_data.agribalyse?.co2_total,
  });
};

const fetchFoodWithSearch = async (req, res) => {
  const search_term = req.params.search_term;
  const user = req.user._id; // Assuming you have user information from authentication middleware

  // Make a request to the Open Food Facts API with the search term
  const response = await openFoodFactsAPI.get("/cgi/search.pl", {
    params: {
      action: "process",
      search_terms: search_term, // Use the search term parameter
      sort_by: "popularity_key",
      page_size: 8,
      countries_tags: "united-kingdom",
      json: 1,
    },
  });

  if (!response) throw new Error("No response ??");

  // Handle the response data
  const products = response.data.products;

  // You can process the products array as needed
  const foodList = products.map((product) => {
    const processedScore = 100 - (product.nova_group - 1) * 25;

    // You can add more fields as needed
    return {
      name: product.product_name,
      processedScore: processedScore,
      brand: product.brands,
      image_url: product.image_url,
      barcode: product.code, // Use a unique identifier if available
    };
  });

  // Send the food list as the response
  res.json(foodList);
};

module.exports = { fetchFoodWithBarcode, fetchFoodWithSearch };
