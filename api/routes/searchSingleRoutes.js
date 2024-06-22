const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  searchSingleFood,
  fetchFoodWithIvyId,
} = require("../controllers/searchSingleController");
const { default: rateLimit } = require("express-rate-limit");
const { TooManyRequestsError } = require("../utils/error");

const searchIVYLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 10, // Chose this as the same as OFF search ofc
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests searching IVY",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const searchIVYSingleFoodLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 100, // Chose this as the same as OFF barcode ofc
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests clicking IVY foods",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

router.route("/search/:search_term").get(authMiddleware, searchIVYLimiter, searchSingleFood);
router.route("/:IvyId/date/:date").get(authMiddleware, searchIVYSingleFoodLimiter, fetchFoodWithIvyId);

module.exports = router;
