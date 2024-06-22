const foodService = require("../services/foodService");
const { default: axios } = require("axios");
const { NotFoundError } = require("../utils/error");

const fetchFoodWithBarcode = async (req, res) => {
  const { barcode, date } = req.params;
  const userId = req.user._id; // Assuming you have user information from authentication middleware
  try {
    const foodData = await foodService.fetchOFFWithBarcode({
      barcode,
      userId,
      date,
    });
    res.json(foodData);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new NotFoundError(`Product with barcode ${barcode} not found`);
    }
    throw error; // This makes sure it goes to middleware
  }
};

const fetchFoodWithSearch = async (req, res) => {
  const search_term = req.params.search_term;
  const foodList = await foodService.fetchOFFWithSearch({ search_term });

  res.json(foodList);
};

module.exports = { fetchFoodWithBarcode, fetchFoodWithSearch };
