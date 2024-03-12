const foodService = require("../services/foodService");

const fetchFoodWithBarcode = async (req, res) => {
  const barcode = req.params.barcode;
  const userId = req.user._id; // Assuming you have user information from authentication middleware

  const foodData = await foodService.fetchOFFWithBarcode({ barcode, userId });

  res.json(foodData);
};

const fetchFoodWithSearch = async (req, res) => {
  const search_term = req.params.search_term;

  const foodList = await foodService.fetchOFFWithSearch({search_term})

  res.json(foodList);
};

module.exports = { fetchFoodWithBarcode, fetchFoodWithSearch };
