const { startOfDay, endOfDay, parseISO } = require("date-fns");
const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");
const { zonedTimeToUtc, utcToZonedTime } = require("date-fns-tz");
const { getCurrentDateLocal } = require("../utils/dateHelper");
function getNormalizedDate(date = new Date()) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

async function addFoodToDiary({ userId, foodDetails }) {
  const { barcode, singleFoodId, date } = foodDetails;

  const localDate = new Date(date + "T00:00:00.000Z");
  // const timeZone = "Australia/Melbourne";
  // const timeZoneTwo = "Europe/London";
  // const dateInUTC = zonedTimeToUtc(localDate, timeZoneTwo);
  // const dateInLocal = utcToZonedTime(dateInUTC, timeZoneTwo);
  // const startOfDayUTC = zonedTimeToUtc(startOfDay(localDate), timeZoneTwo);
  // const endOfDayUTC = zonedTimeToUtc(endOfDay(localDate), timeZoneTwo);

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
        $addToSet: { consumedFoods: foodItem._id },
        // $setOnInsert: { date: dateInUTC },
      }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  } else if (singleFoodId) {
    foodItem = await SingleFood.findById(singleFoodId);

    diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: localDate },
      {
        $addToSet: { consumedSingleFoods: foodItem._id },
        // $setOnInsert: { date: dateInUTC },
      }, // Use $addToSet to only add if the foodItem isn't already in the array
      { new: true, upsert: true } // Create the document if it doesn't exist and return the updated document
    );
  }

  if (!diaryDay) throw new NotFoundError("Error when creating diary day");

  await diaryDay.updateDiaryDayState();

  return diaryDay;
}

async function removeFoodFromDiaryDay({ userId, barcode, singleFoodId, date }) {
  // Similar to before, get the date in terms of just the local time so
  // On the frontend may need to convert from UTC to local time
  // const normalizedDay = getNormalizedDate(date);
  // const localDate = parseISO(date)
  const localDate = new Date(date + "T00:00:00.000Z");
  // const timeZoneTwo = "Europe/London";
  // const dateInUTC = zonedTimeToUtc(date, timeZoneTwo)
  // const startOfDayUTC = zonedTimeToUtc(startOfDay(localDate), timeZoneTwo);
  // const endOfDayUTC = zonedTimeToUtc(endOfDay(localDate), timeZoneTwo);

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
    { userId: userId, date: localDate },
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
  // const queryDate = getNormalizedDate(date);
  // Here just the same, get startOfDayUTC and endOfDayUTC from the local time
  // Date passed in

  // const localDate = parseISO(date)
  const localDate = new Date(date + "T00:00:00.000Z");

  // const timeZoneTwo = "Europe/London";
  // const timeZoneTwoX = "America/Argentina/Catamarca";
  // const dateInUTC = zonedTimeToUtc(localDate, timeZoneTwo);
  // const dateInUTCX = zonedTimeToUtc(date, timeZoneTwoX);
  // const startOfDayUTC = zonedTimeToUtc(startOfDay(localDate), timeZoneTwo);
  // const endOfDayUTC = zonedTimeToUtc(endOfDay(localDate), timeZoneTwo);

  // console.log(dateInUTC, localDate, startOfDayUTC, endOfDayUTC);

  let diaryDay = await DiaryDay.findOne({
    userId: userId,
    date: localDate,
  })
    .populate("consumedFoods")
    .populate("consumedSingleFoods")
    .lean();
  

  // If no diary day exists for the date, return an empty diary day object
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
  // const today = getNormalizedDate();

  // Need to make this truly local like get timezone offset from frontend!
  const localDate = getCurrentDateLocal()
  // const timeZoneTwo = "Europe/London";
  // const date = parseISO(new Date());
  // const dateInUTC = zonedTimeToUtc(date, timeZoneTwo);

  let diaryDays = await DiaryDay.find({ userId: userId })
    .sort("date")
    .select("_id score date diaryDayState fastedState")
    .lean();

  if (!diaryDays.length) {
    // Create a diary day and send it in array!?
    const newDiaryDay = await DiaryDay.create({ userId, date: localDate });
    diaryDays = [newDiaryDay];
  }

  return diaryDays;
}

async function updateFastedState({ userId, date, fastedState }) {
  // const normalizedDate = getNormalizedDate(date);
  // const localDate = parseISO(date)
  const localDate = new Date(date + "T00:00:00.000Z");
  // const timeZoneTwo = "Europe/London";
  // const dateInUTC = zonedTimeToUtc(localDate, timeZoneTwo);
  // const startOfDayUTC = zonedTimeToUtc(startOfDay(localDate), timeZoneTwo);
  // const endOfDayUTC = zonedTimeToUtc(endOfDay(localDate), timeZoneTwo);

  try {
    const options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const update = { fastedState: fastedState };

    // findOneAndUpdate will find and update, or insert if not found
    const diaryDay = await DiaryDay.findOneAndUpdate(
      { userId: userId, date: localDate },
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
