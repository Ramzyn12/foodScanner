const DiaryDay = require("../models/DiaryDay");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");

const searchSingleFood = async (req, res) => {
  const searchTerm = req.params.search_term; // Assuming you're getting the search term from a query parameter

  if (!searchTerm) return 
  
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

  try {
    const results = await SingleFood.aggregate([
      searchStage,
      {
        $limit: 10,
      },
      {
        $project: { name: 1, image_url: 1, processedScore: 1 }, // Adjust based on the fields you want to return
      },
    ]);
    res.json(results);
  } catch (err) {
    console.error("Error performing search: ", err);
    res.status(500).send("An error occurred while searching");
  }
};

const fetchFoodWithIvyId = async (req, res) => {
  const IvyId = req.params.IvyId;
  const today = new Date();
  today.setHours(0, 0, 0, 0); //
  const user = req.user._id; // Assuming you have user information from authentication middleware

  const singleFood = await SingleFood.findById(IvyId).lean();

  if (!singleFood) throw new Error("No response?");

  const diaryDay = await DiaryDay.findOne({
    userId: user,
    date: today,
  }).populate("consumedSingleFoods");

  // Check if the scanned food is already part of the consumed foods
  const isConsumedToday =
    diaryDay &&
    diaryDay.consumedSingleFoods.some(
      (foodItem) => foodItem._id.toString() === IvyId
    );

  const groceries = await Grocery.findOne({
    userId: user,
  }).populate("groceries.item");

  const isInGroceryList =
    groceries &&
    groceries.groceries.some(
      (groceryItem) => groceryItem.item._id.toString() === IvyId
    );
  
  res.json({ ...singleFood, isConsumedToday, isInGroceryList });
};

module.exports = { searchSingleFood, fetchFoodWithIvyId };
