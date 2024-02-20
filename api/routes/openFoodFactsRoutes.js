const express = require("express");
const router = express.Router();
const { fetchFoodWithBarcode, fetchFoodWithSearch } = require("../controllers/openFoodFactsController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/products/:barcode").get(authMiddleware, fetchFoodWithBarcode)
router.route("/products/search/:search_term").get(authMiddleware, fetchFoodWithSearch)

module.exports = router;
