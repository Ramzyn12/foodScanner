// Endpoint to fetch food details by barcode
const axios = require("axios");
const DiaryDay = require("../models/DiaryDay");

const usdaAPI = axios.create({
  baseURL: "https://api.nal.usda.gov/fdc/v1/",
});

const fetchFoodWithfdcId = async (req, res) => {
  const fdcId = req.params.fdcId;

  const response = await usdaAPI.get(`food/${fdcId}`, {
    params: {
      api_key: process.env.USDA_API_KEY,
    },
  });

  if (!response) throw new Error("No response?");

  const data = response.data;
  res.json(data);
};

const fetchFoodWithSearch = async (req, res) => {
  const search_term = req.params.search_term;

  const response = await usdaAPI.get("foods/search", {
    params: {
      query: search_term,
      api_key: process.env.USDA_API_KEY,
      dataType: ['Foundation'].join(','),
      pageSize: 2,
      pageNumber: 1,
      sortBy: "dataType.keyword",
      sortOrder: 'desc'
    },
  });

  if (!response) throw new Error("No response?");

  const foodList = response.data.foods.map((food) => {
    return {
      name: food.description,
      processedScore: 100,
      brand: "Ingredient",
      fdcId: food.fdcId,
    };
  });

  res.json(foodList);
};

module.exports = { fetchFoodWithfdcId, fetchFoodWithSearch };
