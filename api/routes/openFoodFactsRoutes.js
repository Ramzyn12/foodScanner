const express = require("express");
const router = express.Router();
const {
  fetchFoodWithBarcode,
  fetchFoodWithSearch,
} = require("../controllers/openFoodFactsController");
const authMiddleware = require("../middleware/authMiddleware");
const { default: rateLimit } = require("express-rate-limit");
const { TooManyRequestsError } = require("../utils/error");


const getOFFBarcodeLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 100, // Chose this as its what it says in docs
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests getting barcode from OFF",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const searchOFFLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 10, // Chose this as its what it says in docs
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests searching OFF",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

router
  .route("/products/:barcode/date/:date")
  .get(authMiddleware, getOFFBarcodeLimiter, fetchFoodWithBarcode);
router
  .route("/products/search/:search_term")
  .get(authMiddleware, searchOFFLimiter, fetchFoodWithSearch);

module.exports = router;
