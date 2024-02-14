const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { fetchFoodWithSearchFatSecret } = require("../controllers/fatSecretController");

// router.route("/products/:barcode").get(authMiddleware, fetchFoodWithfcid)
router.route("/products/search/:search_term").get(authMiddleware, fetchFoodWithSearchFatSecret)

module.exports = router;
