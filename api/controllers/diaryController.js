
const diaryService = require("../services/diaryService");
const { validationResult } = require("express-validator");

/*
if barcode, checks if foodItem else creates and adds to consumedFoods
if singleFoodId (ivyId) just adds to consumedSingleFoods
*/
const addFoodToDiaryDay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.user._id;
  const diaryDay = await diaryService.addFoodToDiary({
    userId,
    foodDetails: req.body
  });
  res.status(200).json(diaryDay);
};


const removeFoodFromDiaryDay = async (req, res) => {
  const userId = req.user._id;

  const { barcode, singleFoodId, date } = req.body;

  const diaryDay = await diaryService.removeFoodFromDiaryDay({
    userId,
    barcode,
    singleFoodId,
    date
  });

  res.status(200).json(diaryDay);
};


const getDiaryDay = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.params;

  const diaryDay = await diaryService.getDiaryDay({date, userId})

  res.status(200).json(diaryDay);
};


const getAllDiaryDays = async (req, res) => {
  const userId = req.user._id;

  const diaryDays = await diaryService.getAllDiaryDays({userId})

  res.status(200).json(diaryDays);
};


module.exports = {
  addFoodToDiaryDay,
  getDiaryDay,
  removeFoodFromDiaryDay,
  getAllDiaryDays,
};
