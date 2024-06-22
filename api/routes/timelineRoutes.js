const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getRecentTimelineWeek,
  getAllTimelineWeeks,
  getTimelineWeek
} = require("../controllers/timelineController");
const { TooManyRequestsError } = require("../utils/error");
const { default: rateLimit } = require("express-rate-limit");
const router = express.Router();

const getRecentWeekLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 40, 
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests for recent timeline week",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const getAllTimelineWeeksLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 40, 
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests for all timeline weeks",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const getTimelineWeekLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 20, 
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests for timeline week",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

router.route("/recent").get(authMiddleware, getRecentWeekLimiter, getRecentTimelineWeek);
router.route("/").get(authMiddleware, getAllTimelineWeeksLimiter, getAllTimelineWeeks);
router.route("/week/:week").get(authMiddleware, getTimelineWeekLimiter, getTimelineWeek);

module.exports = router;
