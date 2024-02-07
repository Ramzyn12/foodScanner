// Endpoint to fetch food details by barcode
const axios = require("axios");
const DiaryDay = require("../models/DiaryDay");

const usdaAPI = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1/foods",
});

const fetchFoodWithfdcId = async (req, res) => {
  const fcid = req.params.fcid;
  const user = req.user._id; // Assuming you have user information from authentication middleware

  const response = await usdaAPI.get(`/${fcid}`);

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
  });
};

const fetchFoodWithSearch = async (req, res) => {
  const search_term = req.params.search_term;
  
  const response = await usdaAPI.get("/search", {
    params: {
      query: search_term, 
      api_key: process.env.USDA_API_KEY,
      dataType: "Foundation",
      page_size: 8,
      sortBy: 'dataType.keyword',
    },
  });

  if(!response) throw new Error('No response?')

  const foodList = response.data.foods.map((food) => {
    return {
      name: food.description,
      processedScore: 100,
      brand: 'Ingredient',
      fdcId: food.fdcId
    };
  });

  res.json(foodList);
};

module.exports = { fetchFoodWithfdcId, fetchFoodWithSearch };
