const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

function getNormalizedDate(date = new Date()) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

async function addFoodToDiary({ userId, foodDetails }) {
  const { barcode, singleFoodId, date } = foodDetails; //Includes all foodItem model fields
  const normalizedDay = getNormalizedDate(date);

  let foodItem;
  let diaryDay;

  if (barcode) {
    foodItem = await FoodItem.findOne({ barcode: barcode });

    if (!foodItem) {
      foodItem = await FoodItem.create(foodDetails);
    }

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: normalizedDay },
      {
        $addToSet: { consumedFoods: foodItem._id },
      }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  } else if (singleFoodId) {
    foodItem = await SingleFood.findById(singleFoodId);

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: normalizedDay },
      {
        $addToSet: { consumedSingleFoods: foodItem._id },
      }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  }

  if (!diaryDay) throw new NotFoundError("Error when creating diary day");

  await diaryDay.updateDiaryDayState();

  return diaryDay;
}

async function removeFoodFromDiaryDay({ userId, barcode, singleFoodId, date }) {
  const normalizedDay = getNormalizedDate(date);

  let update = {};

  if (barcode) {
    const foodItem = await FoodItem.findOne({ barcode });
    if (!foodItem) {
      throw new NotFoundError("Not found food item");
    }
    update = { $pull: { consumedFoods: foodItem._id } };
  } else if (singleFoodId) {
    const foodItem = await SingleFood.findById(singleFoodId);
    if (!foodItem) {
      throw new NotFoundError("Not found food item");
    }
    update = { $pull: { consumedSingleFoods: foodItem._id } };
  }

  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: userId, date: normalizedDay },
    update,
    { new: true }
  );

  if (!diaryDay) {
    throw new NotFoundError("Update failed for the diary day?");
  }

  await diaryDay.updateDiaryDayState();

  return diaryDay;
}

async function getDiaryDay({ userId, date }) {
  const queryDate = getNormalizedDate(date);

  let diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: queryDate,
  })
    .populate("consumedFoods")
    .populate("consumedSingleFoods")
    .lean();

  // If no diary day exists for the date, return an empty diary day object
  // Or we should be creating one? or handle on frontend says chatGPT
  if (!diaryDay) {
    diaryDay = {
      userId: userId,
      date: queryDate,
      consumedFoods: [],
      consumedSingleFoods: [],
      score: 0,
      hasProcessed: false,
    };
  }

  return diaryDay;
}

async function getAllDiaryDays({ userId }) {
  const today = getNormalizedDate();

  let diaryDays = await DiaryDay.find({ userId: userId })
    .sort("date")
    .select("_id score date diaryDayState fastedState")
    .lean();

  if (!diaryDays.length) {
    // Create a diary day and send it in array!?
    const newDiaryDay = await DiaryDay.create({ userId, date: today });
    diaryDays = [newDiaryDay];
  }

  return diaryDays;
}

async function updateFastedState({ userId, date, fastedState }) {
  const normalizedDate = getNormalizedDate(date);

  try {
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const update = { fastedState: fastedState };

    // findOneAndUpdate will find and update, or insert if not found
    const diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: normalizedDate },
      { $set: update },
      options
    );

    return diaryDay;
  } catch (error) {
    console.error("Error updating or creating DiaryDay:", error);
    throw error; // Rethrow or handle as needed
  }
}

module.exports = {
  addFoodToDiary,
  removeFoodFromDiaryDay,
  getDiaryDay,
  getAllDiaryDays,
  updateFastedState,
};
