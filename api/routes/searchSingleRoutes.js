const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { searchSingleFood, fetchFoodWithIvyId } = require("../controllers/searchSingleController");

router.route("/search/:search_term").get(authMiddleware, searchSingleFood)
router.route("/:IvyId/date/:date").get(authMiddleware, fetchFoodWithIvyId)

module.exports = router;
