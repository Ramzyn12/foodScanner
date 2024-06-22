const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getNote, updateNote } = require("../controllers/noteController");
const { TooManyRequestsError } = require("../utils/error");
const { default: rateLimit } = require("express-rate-limit");

const getNoteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 60,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests getting notes",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const updateNoteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 40,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests updating notes",
      { limit: options.limit, window: options.windowMs }
    );
  },
});


router
  .route("/date/:date")
  .get(authMiddleware, getNoteLimiter, getNote)
  .post(authMiddleware, updateNoteLimiter, updateNote);

module.exports = router;
