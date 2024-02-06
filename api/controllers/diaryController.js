const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const { NotFoundError } = require("../utils/error");

const addFoodToDiaryDay = async (req, res) => {
  const user = req.user._id;

  const {
    barcode,
    name,
    brand,
    ingredients,
    additives,
    nova_group,
    image_url,
  } = req.body;

  const processedScore = 100 - (+nova_group - 1) * 25;
  // Check if food item in DB else create one
  let foodItem = await FoodItem.findOne({ barcode: barcode });
  if (!foodItem) {
    foodItem = await FoodItem.create({
      barcode,
      image_url,
      name,
      brand,
      ingredients,
      additives,
      processedScore,
    });
  }

  // Set today's date (with time part removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to make sure it's the start of the day

  // Find the diary day or create it if it doesn't exist
  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: user, date: today },
    { $addToSet: { consumedFoods: foodItem._id } }, // Use $addToSet to only add if the foodItem isn't already in the array
    { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
  );

  // If diary day is created, set the initial score, else calculate the new average score
  if (diaryDay.consumedFoods.length === 1 && diaryDay.score === undefined) {
    // Newly created diary day
    diaryDay.score = processedScore;
  } else {
    // Existing diary day, calculate new average score
    // Pass thing into function to use in other handler aswell
    const totalScore =
      diaryDay.score * (diaryDay.consumedFoods.length - 1) + processedScore;
    diaryDay.score = totalScore / diaryDay.consumedFoods.length;
  }

  // Save the updated diaryDay document
  await diaryDay.save();

  res.status(200).json(diaryDay);
};

const removeFoodFromDiaryDay = async (req, res) => {
  const user = req.user._id; // Assuming you have user information from authentication middleware
  // Should i pass foodid instead of barcode if possible?
  const barcode = req.params.barcode; // Get the barcode from route parameters

  // Set today's date (with time part removed)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to make sure it's the start of the day

  // Find the food item based on barcode
  const foodItem = await FoodItem.findOne({ barcode: barcode });
  if (!foodItem) {
    throw new NotFoundError("Food item not found");
  }

  // Find the diary entry for the user for the specific date and remove the food item
  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: user, date: today },
    { $pull: { consumedFoods: foodItem._id } }, // Use $pull to remove the foodItem from the array
    { new: true } // Return the updated document
  );

  if (!diaryDay) {
    throw new NotFoundError("Diary entry not found for the specified date.");
  }

  // Recalculate the score after removing the food item
  // (This will depend on your scoring logic. Below is a placeholder for where that logic would go.)
  // const newScore = recalculateScore(diaryDay.consumedFoods);
  // diaryDay.score = newScore;

  // Save the updated diaryDay document (if necessary, depending on your scoring logic)
  // await diaryDay.save();

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
  }).populate("consumedFoods"); // Optionally populate the consumedFoods to get full food item details

  // If no diary day exists for the date, return an empty diary day object
  if (!diaryDay) {
    diaryDay = {
      userId: user,
      date: queryDate,
      consumedFoods: [],
      score: 0,
    };
  }

  res.status(200).json(diaryDay);
};

module.exports = { addFoodToDiaryDay, getDiaryDay, removeFoodFromDiaryDay };
