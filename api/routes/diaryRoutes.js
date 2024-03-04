const express = require("express");
const {
  addFoodToDiaryDay,
  getDiaryDay,
  removeFoodFromDiaryDay,
  getAllDiaryDays,
} = require("../controllers/diaryController");
const authMiddleware = require("../middleware/authMiddleware");
const { auth } = require("firebase-admin");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, addFoodToDiaryDay)
  .delete(authMiddleware, removeFoodFromDiaryDay);

router.route("/all").get(authMiddleware, getAllDiaryDays);
router.route("/remove").post(authMiddleware, removeFoodFromDiaryDay);
router.route("/:date").get(authMiddleware, getDiaryDay);

module.exports = router;
