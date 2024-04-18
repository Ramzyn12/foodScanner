const {
  differenceInCalendarDays,
  startOfDay,
  addWeeks,
  addDays,
} = require("date-fns");
const DiaryDay = require("../models/DiaryDay");
const TimelineWeek = require("../models/TimelineWeek");
const timelineService = require("../services/timelineService");
const { mongoose } = require("mongoose");
const HealthMetric = require("../models/HealthMetric");

const getRecentTimelineWeek = async (req, res) => {
  const userId = req.user._id;

  const latestTimelineWeek = await timelineService.getRecentTimelineWeek({
    userId,
  });

  console.log(latestTimelineWeek);

  res.status(200).json(latestTimelineWeek);
};

const getAllTimelineWeeks = async (req, res) => {
  const userId = req.user._id;

  const timelineWeeks = await timelineService.getAllTimelineWeeks({ userId });

  res.status(200).json(timelineWeeks);
};

const getTimelineWeek = async (req, res) => {
  const userId = req.user._id;
  const { week } = req.params;

  const recentDiaryDay = await DiaryDay.findOne({ userId: userId }).sort({
    date: 1,
  });

  if (!recentDiaryDay) {
    return res
      .status(404)
      .json({ message: "No diary days found for this user." });
  }

  const lastDiaryDate = new Date(recentDiaryDay.date);
  const differenceInDays = differenceInCalendarDays(new Date(), lastDiaryDate);
  const firstDayOfWeek = startOfDay(addWeeks(lastDiaryDate, week - 1)); //
  const arrayOfDates = Array.from({ length: 7 }, (_, i) =>
    addDays(firstDayOfWeek, i)
  );
  


  const [timelineWeek, diaryDays, healthMetrics] = await Promise.all([
    TimelineWeek.findOne({ week })
    .select("title subtitle description"),

    DiaryDay.find({
      userId,
      date: { $in: arrayOfDates }
    }).sort({ date: 1 }).select("date fastedState diaryDayState"),
    
    HealthMetric.aggregate([
      { $match: { userId, date: { $in: arrayOfDates } } },
      { $group: {
        _id: "$date",
        metrics: { $push: { metric: "$metric", metricValue: "$metricValue", unitOfMeasure: "$unitOfMeasure" } }
      }},
      { $sort: { _id: 1 } }
    ])
  ]);

  const metricTypes = ['Anxiety', 'Sleep Quality', 'Energy', 'Weight']; // Define all possible metrics

  // Maybe optimise this if slow on server and defo put as own function
  let combinedDataByDate = arrayOfDates.map(date => {
    const foundMetrics = healthMetrics.find(m => m._id.toISOString() === date.toISOString()) || { metrics: [] };
    const foundDiaryDay = diaryDays.find(d => d.date.toISOString() === date.toISOString());

    // Ensure all metrics are present, even if they have null values
    let metrics = metricTypes.map(metricType => {
      const metricData = foundMetrics.metrics.find(m => m.metric === metricType);
      return {
        [metricType]: {
          metricValue: metricData ? metricData.metricValue : null,
          unitOfMeasure: metricData ? metricData.unitOfMeasure : null
        }
      };
    });

    return {
      date: date,
      diaryDetails: foundDiaryDay ? {
        fastedState: foundDiaryDay.fastedState,
        diaryDayState: foundDiaryDay.diaryDayState
      } : { fastedState: false, diaryDayState: "empty" },
      metrics: metrics
    };
  });

  // console.log({
  //   timelineWeek,
  //   currentDayOfWeek,
  //   weeksData: combinedDataByDate
  // });

  res.status(200).json({
    timelineWeek,
    daysPassed: differenceInDays,
    weeksData: combinedDataByDate
  });
};

module.exports = {
  getRecentTimelineWeek,
  getAllTimelineWeeks,
  getTimelineWeek,
};
