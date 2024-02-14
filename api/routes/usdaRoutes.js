const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { fetchFoodWithfdcId, fetchFoodWithSearch } = require("../controllers/usdaController");

// router.route("/products/:barcode").get(authMiddleware, fetchFoodWithfcid)
router.route("/products/search/:search_term").get(authMiddleware, fetchFoodWithSearch)
router.route("/products/:fdcId").get(authMiddleware, fetchFoodWithfdcId)

module.exports = router;
