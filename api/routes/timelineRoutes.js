const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getRecentTimelineWeek,
  getAllTimelineWeeks,
  getTimelineWeek
} = require("../controllers/timelineController");
const router = express.Router();


router.route("/recent").get(authMiddleware, getRecentTimelineWeek);
router.route("/").get(authMiddleware, getAllTimelineWeeks);
router.route("/week/:week").get(authMiddleware, getTimelineWeek);

module.exports = router;
