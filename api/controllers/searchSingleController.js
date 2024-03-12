
const foodService = require('../services/foodService')


const searchSingleFood = async (req, res) => {
  const searchTerm = req.params.search_term;

  if (!searchTerm) return;

  const results = await foodService.fetchSingleFoodsWithSearch({searchTerm})
  
  res.json(results);
};

const fetchFoodWithIvyId = async (req, res) => {
  const IvyId = req.params.IvyId;
  const userId = req.user._id;

  const {singleFood, isConsumedToday, isInGroceryList} = await foodService.fetchSingleFoodsWithIvyId({IvyId, userId})

  res.json({ ...singleFood, isConsumedToday, isInGroceryList });
};

module.exports = { searchSingleFood, fetchFoodWithIvyId };
