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
const rateLimit = require('express-rate-limit')

// Could define these all in a seperate file to keep it clean
const diaryLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP For diary, try again in 5 mins",
});

router.use(diaryLimiter) // Or add it as a middleware in a specific route

router
  .route("/")
  .post(authMiddleware, addFoodValidator, addFoodToDiaryDay)
  .delete(authMiddleware, removeFoodFromDiaryDay);

router.route("/all").get(authMiddleware, getAllDiaryDays);
router.route("/remove").post(authMiddleware, removeFoodFromDiaryDay);
router.route("/:date").get(authMiddleware, getDiaryDay);
router.route("/toggle-fasting").post(authMiddleware, updateFastedState);

module.exports = router;
