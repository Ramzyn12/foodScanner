const HealthMetric = require("../models/HealthMetric");
const { startOfDay, endOfDay, addDays, format } = require('date-fns')

function getNormalizedDate(date = new Date()) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

async function updateHealthMetric({ date, metric, userId, metricValue, unitOfMeasure }) {
  const normalizedDate = getNormalizedDate(date);
  const updateOptions = { upsert: true, new: true, runValidators: true };
  const updateData = { metricValue };

  // Only add 'unitOfMeasure' to the update document if the metric is 'Weight'
  if (metric === 'Weight') {
    updateData.unitOfMeasure = unitOfMeasure;
  }

  // Use await to handle the asynchronous operation directly if you need the result immediately
  const updatedMetric = await HealthMetric.findOneAndUpdate(
    { date: normalizedDate, metric, userId },
    updateData,
    updateOptions
  );

  return updatedMetric;
}

async function getRecentMetric({ metric, userId }) {
  // DONT need to return everything e.g userId etc...

  const recentMetric = await HealthMetric.findOne({ userId, metric })
    .sort({ date: -1 }) // Sort by date descending
    .exec();

  return recentMetric;
}
async function getAllDataForMetric({ metric, userId, timeFrame }) {
  const days = timeFrame === 'Month' ? 28 : timeFrame === 'Year' ? 364 : 7
  const today = new Date();
  const endDate = endOfDay(today); // Set end of today
  const startDate = startOfDay(addDays(today, -days + 1)); // 7 days ago, including today

  const metricData = await HealthMetric.find({
    userId,
    metric,
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1 });

  // Map existing data by local date strings
  const dataByDate = new Map(
    metricData.map((entry) => [format(entry.date, "yyyy-MM-dd"), entry])
  );

  // Fill in missing days
  const results = [];
  for (let day = 0; day < days; day++) {
    const currentDate = addDays(startDate, day);
    const dateString = format(currentDate, "yyyy-MM-dd"); // Formats date as 'YYYY-MM-DD'

    if (dataByDate.has(dateString)) {
      results.push(dataByDate.get(dateString));
    } else {
      results.push({
        userId,
        metric,
        date: currentDate, // Keep the Date object here for consistency
        metricValue: null, // or some default value or indicator of no data
        runningAverage: null, // optional, depends on your requirements
      });
    }
  }

  console.log(results);

  return results;
}

module.exports = {
  updateHealthMetric,
  getRecentMetric,
  getAllDataForMetric,
};
