const HealthMetric = require("../models/HealthMetric");
const { addDays, format } = require('date-fns');
const { getCurrentDateLocal } = require("../utils/dateHelper");
const { BadRequestError, NotFoundError } = require("../utils/error");
const User = require("../models/User");


async function updateHealthMetric({ date, metric, userId, metricValue, unitOfMeasure }) {

  const localDate = new Date(date + "T00:00:00.000Z");
  const updateOptions = { upsert: true, new: true, runValidators: true };
  const updateData = { metricValue };

  const validMetrics = ['Weight', 'Anxiety', 'Energy', 'Sleep Quality'];
  if (!validMetrics.includes(metric)) {
    throw new BadRequestError('Invalid metric value', {validMetrics})
  }
  // Only add 'unitOfMeasure' to the update document if the metric is 'Weight'
  if (metric === 'Weight') {
    if (!unitOfMeasure) throw new BadRequestError('Need to specify unit of measure for weight!', {unitOfMeasure})
    updateData.unitOfMeasure = unitOfMeasure;
  }

  // Use await to handle the asynchronous operation directly if you need the result immediately
  const updatedMetric = await HealthMetric.findOneAndUpdate(
    { date: localDate, metric, userId },
    updateData,
    updateOptions
  );

  // Probs wont get triggered because of upsert: true
  if (!updatedMetric) throw new NotFoundError('Error updating health metric')

  return updatedMetric;
}

//Gets the most recent metric value for the metric e.g Sleep Quality
async function getRecentMetric({ metric, userId }) {

  // throw new Error('')
  // DONT need to return everything e.g userId etc...

  const recentMetric = await HealthMetric.findOne({ userId, metric })
    .sort({ date: -1 }) // Sort by date descending
    .exec();

  // If no recent metric, frontend just shows empty state, no need for error

  return recentMetric;
}

async function getAllDataForMetric({ metric, userId, timeFrame }) {

  if (!['Week', 'Month', 'Year'].includes(timeFrame)) {
    throw new BadRequestError('Invalid time frame value', { timeFrame });
  }

  // throw new Error('')

  const user = await User.findById(userId);

  if (timeFrame !== 'Week' && !user.isSubscribed) {
    throw new BadRequestError('Subscription Required to access more data')
  }
  
  const days = timeFrame === 'Month' ? 28 : timeFrame === 'Year' ? 364 : 7
  const today = new Date(getCurrentDateLocal());
  const endDate = today; // Set end of today
  const startDate = addDays(today, -days + 1); // 7 days ago, including today
  
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
      // "Empty" state
      results.push({
        userId,
        metric,
        date: currentDate, // Keep the Date object here for consistency
        metricValue: null, // or some default value or indicator of no data
        runningAverage: null, // optional, depends on your requirements
      });
    }
  }

  return results;
}

module.exports = {
  updateHealthMetric,
  getRecentMetric,
  getAllDataForMetric,
};
