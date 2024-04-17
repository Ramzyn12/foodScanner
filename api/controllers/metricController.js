const metricService = require("../services/metricService");

const updateHealthMetric = async (req, res) => {
  const userId = req.user._id;
  const { metricValue, unitOfMeasure } = req.body;
  const { date, metric } = req.params;

  const healthMetric = await metricService.updateHealthMetric({
    userId,
    date,
    metric,
    metricValue,
    unitOfMeasure
  });

  res.status(200).json(healthMetric);
};

const getRecentMetric = async (req, res) => {
  const userId = req.user._id;
  const { metric } = req.query;

  const recentMetric = await metricService.getRecentMetric({
    userId,
    metric,
  });

  res.status(200).json(recentMetric);
};

const getAllDataForMetric = async (req, res) => {
  const userId = req.user._id;
  const { metric, timeFrame } = req.query;

  const metricData = await metricService.getAllDataForMetric({
    userId,
    metric,
    timeFrame
  });

  res.status(200).json(metricData);
};

module.exports = {
  updateHealthMetric,
  getAllDataForMetric,
  getRecentMetric,
};
