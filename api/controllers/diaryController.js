const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

const addFoodToDiaryDay = async (req, res) => {
  const user = req.user._id;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const {
    barcode,
    singleFoodId,
    name,
    brand,
    ingredients,
    additives,
    processedScore,
    image_url,
  } = req.body;

  let foodItem;
  let diaryDay;

  if (barcode) {
    foodItem = await FoodItem.findOne({ barcode: barcode });

    if (!foodItem) {
      foodItem = await FoodItem.create(req.body);
    }

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: user, date: today },
      { $addToSet: { consumedFoods: foodItem._id } }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  }

  if (singleFoodId) {
    foodItem = await SingleFood.findById(singleFoodId);

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: user, date: today },
      { $addToSet: { consumedSingleFoods: foodItem._id } }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  }

  // Calculate and update the average score
  await diaryDay.updateAverageScore(); // Calculate and update the average score

  res.status(200).json(diaryDay);
};

const removeFoodFromDiaryDay = async (req, res) => {
  const user = req.user._id; // Assuming you have user information from authentication middleware
  // Should i pass foodid instead of barcode if possible?
  const { barcode, singleFoodId } = req.body; // Get the barcode from route parameters

  // Set today's date (with time part removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to make sure it's the start of the day

  // Find the food item based on barcode
  let update = {};

  if (barcode) {
    // Find the food item by barcode
    const foodItem = await FoodItem.findOne({ barcode });
    if (!foodItem) {
      throw new NotFoundError("Not found food item");
    }
    update = { $pull: { consumedFoods: foodItem._id } };
  } else if (singleFoodId) {
    // Find the food item by singleFoodId
    const foodItem = await SingleFood.findById(singleFoodId);
    if (!foodItem) {
      throw new NotFoundError("Not found food item");
    }
    update = { $pull: { consumedSingleFoods: foodItem._id } };
  } else {
    return res
      .status(400)
      .json({ message: "No barcode or singleFoodId provided for removal." });
  }

  // Find the diary entry for the user for the specific date and remove the food item
  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: user, date: today },
    update,
    { new: true } // Return the updated document
  );

  if (!diaryDay) {
    throw new NotFoundError("Diary entry not found for the specified date.");
  }

  await diaryDay.updateAverageScore();

  res.status(200).json(diaryDay);
};

const getDiaryDay = async (req, res) => {
  const user = req.user._id; // Assuming you have user information from authentication middleware
  const { date } = req.params; // Get the date from the URL parameter

  // Convert the received date string to a Date object and set the time part to 0
  const queryDate = new Date(date);
  queryDate.setHours(0, 0, 0, 0);

  // Find the diary entry for the user for the specific date
  let diaryDay = await DiaryDay.findOne({
    userId: user,
    date: queryDate,
  })
    .populate("consumedFoods")
    .populate("consumedSingleFoods"); // Optionally populate the consumedFoods to get full food item details

  // If no diary day exists for the date, return an empty diary day object
  if (!diaryDay) {
    diaryDay = {
      userId: user,
      date: queryDate,
      consumedFoods: [],
      consumedSingleFoods: [],
      score: 0,
    };
  }

  res.status(200).json(diaryDay);
};

const getAllDiaryDays = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information from authentication middleware
    
    // Fetch all DiaryDay documents for the user, sorted by date in ascending order
    // Change '-date' to 'date' if you want them in ascending order
    const diaryDays = await DiaryDay.find({ userId: userId })
      .sort("date")
      .select("_id score date");

    if (!diaryDays.length) {
      return res
        .status(404)
        .json({ message: "No diary entries found for the user." });
    }

    res.status(200).json(diaryDays);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching diary days." });
  }
};

// const getLastThreeWeeks = async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming you have user information from authentication middleware
//     console.log(userId);

//     // Fetch all DiaryDay documents for the user, sorted by date in ascending order
//     // Change '-date' to 'date' if you want them in ascending order
//     const diaryDays = await DiaryDay.find({ userId: userId })
//       .sort("date")
//       .select("_id score date");

//     if (!diaryDays.length) {
//       return res
//         .status(404)
//         .json({ message: "No diary entries found for the user." });
//     }

//     res.status(200).json(diaryDays);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while fetching diary days." });
//   }
// };

module.exports = {
  addFoodToDiaryDay,
  getDiaryDay,
  removeFoodFromDiaryDay,
  getAllDiaryDays,
};
