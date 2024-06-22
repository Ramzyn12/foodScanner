const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  updateHealthMetric,
  getRecentMetric,
  getAllDataForMetric,
} = require("../controllers/metricController");
const { default: rateLimit } = require("express-rate-limit");
const { TooManyRequestsError } = require("../utils/error");
const router = express.Router();

// GET /api/health-metrics?metric=Weight

const updateHealthLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 60,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests update health metric",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const getRecentMetricsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 200,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests getting health metrics recent values",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const getAllDataMetricLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 40,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests getting all health metric data",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

router.route("/:date/:metric").post(authMiddleware, updateHealthLimiter, updateHealthMetric);

router.route("/recent").get(authMiddleware, getRecentMetricsLimiter, getRecentMetric);

router
  .route("/")
  .get(authMiddleware, getAllDataMetricLimiter, getAllDataForMetric)

module.exports = router;
