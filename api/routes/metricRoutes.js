const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  updateHealthMetric,
  getRecentMetric,
  getAllDataForMetric,
} = require("../controllers/metricController");
const router = express.Router();

// GET /api/health-metrics?metric=Weight

router.route("/:date/:metric").post(authMiddleware, updateHealthMetric);

router.route("/recent").get(authMiddleware, getRecentMetric);

router
  .route("/")
  .get(authMiddleware, getAllDataForMetric)

module.exports = router;
