const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");
const { getCurrentDateLocal } = require("../utils/dateHelper");
const User = require("../models/User");

async function addFoodToDiary({ userId, foodDetails }) {
  const { barcode, singleFoodId, date } = foodDetails;

  const localDate = new Date(date + "T00:00:00.000Z");

  let foodItem;
  let diaryDay;

  if (barcode) {
    foodItem = await FoodItem.findOne({ barcode: barcode });

    if (!foodItem) {
      foodItem = await FoodItem.create(foodDetails);
    }

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: localDate },
      {
        // addToSet: Ensures can't add duplicate item
        $addToSet: { consumedFoods: foodItem._id },
      },
      { new: true, upsert: true }
    );
  } else if (singleFoodId) {
    foodItem = await SingleFood.findById(singleFoodId);

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: localDate },
      {
        $addToSet: { consumedSingleFoods: foodItem._id },
      },
      { new: true, upsert: true }
    );
  }

  if (!diaryDay) {
    // OR maybe create one??
    throw new NotFoundError("No diary day found!", {userId, localDate});
  }

  await diaryDay.updateDiaryDayState(); // Processed, Unprocessed, Empty

  return diaryDay;
}

async function removeFoodFromDiaryDay({ userId, barcode, singleFoodId, date }) {
  const localDate = new Date(date + "T00:00:00.000Z");

  let update = {};

  if (barcode) {
    const foodItem = await FoodItem.findOne({ barcode });

    if (!foodItem) {
      throw new NotFoundError("Food item not found in database", { barcode });
    }
    update = { $pull: { consumedFoods: foodItem._id } };
  } else if (singleFoodId) {
    const foodItem = await SingleFood.findById(singleFoodId);
    if (!foodItem) {
      throw new NotFoundError("Food item not found in database", {
        singleFoodId,
      });
    }
    update = { $pull: { consumedSingleFoods: foodItem._id } };
  }

  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: userId, date: localDate },
    update,
    { new: true }
  );

  if (!diaryDay) {
    throw new NotFoundError("Error when updating diary day (Removing)");
  }

  await diaryDay.updateDiaryDayState();

  return diaryDay;
}

async function getDiaryDay({ userId, date }) {
  const localDate = new Date(date + "T00:00:00.000Z");

  let diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: localDate,
  })
    .populate("consumedFoods")
    .populate("consumedSingleFoods")
    .lean();

  // If no diary day exists for the date, return an initial state diary day object
  // Or we should be creating one?
  if (!diaryDay) {
    diaryDay = {
      userId: userId,
      date: localDate,
      consumedFoods: [],
      consumedSingleFoods: [],
      score: 0,
      diaryDayState: "empty",
      fastedState: false,
    };
  }

  return diaryDay;
}

async function getAllDiaryDays({ userId }) {
  // Need to make this truly local like get timezone offset from frontend!
  const localDate = getCurrentDateLocal();

  const user = await User.findById(userId);

  if (!user)
    throw new NotFoundError("Could not find user with this userId", { userId });

  let query;

  // If the user is not subscribed, fetch only the last 7 diary days
  if (!user.isSubscribed) {
    query = DiaryDay.find({ userId: userId })
      .sort("-date") // Sort by date in descending order
      .limit(7) // Limit to the last 7 entries
      .select("_id score date diaryDayState fastedState")
      .lean();
  } else {
    // For subscribed users, fetch all diary days
    query = DiaryDay.find({ userId: userId })
      .sort("date") // Sort by date in ascending order
      .select("_id score date diaryDayState fastedState")
      .lean();
  }

  let diaryDays = await query.exec();

  if (!user.isSubscribed) {
    diaryDays.reverse();
  }

  if (!diaryDays.length) {
    // Create a diary day and send it in array!?
    const newDiaryDay = await DiaryDay.create({ userId, date: localDate });
    diaryDays = [newDiaryDay];
  }

  return diaryDays;
}

async function updateFastedState({ userId, date, fastedState }) {
  const localDate = new Date(date + "T00:00:00.000Z");

  const options = { new: true, upsert: true, setDefaultsOnInsert: true };
  const update = { fastedState: fastedState };

  // findOneAndUpdate will find and update, or insert if not found
  const diaryDay = await DiaryDay.findOneAndUpdate(
    { userId: userId, date: localDate },
    { $set: update },
    options
  );

  if (!diaryDay) {
    throw new NotFoundError("Updated fasted state failed for diary day", {
      date: localDate,
    });
  }

  return diaryDay;
}

module.exports = {
  addFoodToDiary,
  removeFoodFromDiaryDay,
  getDiaryDay,
  getAllDiaryDays,
  updateFastedState,
};
