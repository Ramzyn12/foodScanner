const express = require("express");
const { addFoodToDiaryDay, getDiaryDay, removeFoodFromDiaryDay } = require("../controllers/diaryController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(authMiddleware, addFoodToDiaryDay).delete(authMiddleware, removeFoodFromDiaryDay)
router.route("/remove").post(authMiddleware, removeFoodFromDiaryDay)
router.route("/:date").get(authMiddleware, getDiaryDay);

module.exports = router;
