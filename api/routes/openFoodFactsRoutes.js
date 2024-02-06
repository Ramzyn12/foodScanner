const express = require("express");
const router = express.Router();
const { fetchFoodWithBarcode } = require("../controllers/openFoodFactsController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/products/:barcode").get(authMiddleware, fetchFoodWithBarcode)

module.exports = router;
