const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { fetchFoodWithfcid, fetchFoodWithSearch } = require("../controllers/usdaController");

// router.route("/products/:barcode").get(authMiddleware, fetchFoodWithfcid)
router.route("/products/search/:search_term").get(authMiddleware, fetchFoodWithSearch)

module.exports = router;
