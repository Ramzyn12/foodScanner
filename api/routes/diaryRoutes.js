const express = require("express");
const {
  addFoodToDiaryDay,
  getDiaryDay,
  removeFoodFromDiaryDay,
  getAllDiaryDays,
  updateFastedState,
} = require("../controllers/diaryController");
const authMiddleware = require("../middleware/authMiddleware");
const { auth } = require("firebase-admin");
const { addFoodValidator } = require("../middleware/validators/diaryValidator");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { TooManyRequestsError } = require("../utils/error");

// Could define these all in a seperate file to keep it clean
const addOrRemoveDiaryLimiter = rateLimit({
  windowMs: 1 * 60 * 500, // 30 secs
  limit: 20,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError('Too many requests adding or removing diary', {limit: options.limit, window: options.windowMs})
  },
});

const getAllDiaryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  limit: 200,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError('Too many requests getting all diary days', {limit: options.limit, window: options.windowMs})
  },
});

const getDiaryDayLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  limit: 120,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError('Too many requests getting all diary days', {limit: options.limit, window: options.windowMs})
  },
});

const updatedFastedLimiter = rateLimit({
  windowMs: 1 * 60 * 50, // 30 sec
  limit: 20,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError('Too many requests getting all diary days', {limit: options.limit, window: options.windowMs})
  },
});

router
  .route("/")
  .post(authMiddleware, addOrRemoveDiaryLimiter, addFoodValidator, addFoodToDiaryDay)

router.route("/all").get(authMiddleware, getAllDiaryLimiter, getAllDiaryDays);
router.route("/remove").post(authMiddleware, addOrRemoveDiaryLimiter, removeFoodFromDiaryDay);
router.route("/:date").get(authMiddleware, getDiaryDayLimiter, getDiaryDay);
router.route("/toggle-fasting").post(authMiddleware, updatedFastedLimiter, updateFastedState);

module.exports = router;
