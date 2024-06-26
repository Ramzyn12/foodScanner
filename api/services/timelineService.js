const DiaryDay = require("../models/DiaryDay");
const TimelineWeek = require("../models/TimelineWeek");
const HealthMetric = require("../models/HealthMetric");
const { differenceInCalendarDays, addWeeks, addDays } = require("date-fns");
const { getCurrentDateLocal } = require("../utils/dateHelper");
const Note = require("../models/Note");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/error");
const User = require("../models/User");

async function getRecentTimelineWeek({ userId }) {
  const recentDiaryDay = await DiaryDay.findOne({ userId: userId }).sort({
    date: 1,
  });

  if (!recentDiaryDay) {
    throw new NotFoundError("Error trying to fetch recent diary day");
  }

  const today = new Date(getCurrentDateLocal());
  const lastDiaryDate = new Date(recentDiaryDay?.date || today);
  const differenceInDays = differenceInCalendarDays(today, lastDiaryDate);

  let week = Math.ceil(differenceInDays / 7);
  if (week === 0) week = 1;
  const currentDay = differenceInDays % 7;

  const latestTimelineWeek = await TimelineWeek.findOne({ week: week }).lean();

  return { ...latestTimelineWeek, currentDay: currentDay };
}

async function getAllTimelineWeeks({ userId }) {
  const diaryDays = await DiaryDay.find({ userId: userId }).sort({
    date: 1,
  });

  const recentDiaryDay = diaryDays[0];

  if (!recentDiaryDay) {
    throw new NotFoundError("No diary day found for this user");
  }

  const today = new Date(getCurrentDateLocal());
  const lastDiaryDate = new Date(recentDiaryDay.date);
  const differenceInDays = differenceInCalendarDays(today, lastDiaryDate);

  const timelineWeeks = await TimelineWeek.find()
    .select("title subtitle svg week")
    .sort({ week: 1 });

  return { timelineWeeks, daysSinceStart: differenceInDays };
}

async function getTimelineWeek({ userId, week }) {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError("Could not find user with this userId", { userId });
  }

  if (!user.isSubscribed) {
    throw new UnauthorizedError('Subscription Required to access timeline week!')
  }

  const recentDiaryDay = await DiaryDay.findOne({ userId: userId }).sort({
    date: 1,
  });

  if (!recentDiaryDay) {
    throw new NotFoundError("No diary day found for this user");
  }

  const lastDiaryDate = new Date(recentDiaryDay.date);
  const today = new Date(getCurrentDateLocal());
  const differenceInDays = differenceInCalendarDays(today, lastDiaryDate);
  const firstDayOfWeek = addWeeks(lastDiaryDate, week - 1);

  const arrayOfDates = Array.from({ length: 7 }, (_, i) =>
    addDays(firstDayOfWeek, i)
  );
  /* arrayOfDates [
  2024-05-21T00:00:00.000Z,
  2024-05-22T00:00:00.000Z,
 ...
  ]
  */

  const [timelineWeek, diaryDays, healthMetrics, notes] = await Promise.all([
    TimelineWeek.findOne({ week }).select("title subtitle description"),

    DiaryDay.find({
      userId,
      date: { $in: arrayOfDates },
    })
      .sort({ date: 1 })
      .select("date fastedState diaryDayState"),

    HealthMetric.aggregate([
      { $match: { userId, date: { $in: arrayOfDates } } },
      {
        $group: {
          _id: "$date",
          metrics: {
            $push: {
              metric: "$metric",
              metricValue: "$metricValue",
              unitOfMeasure: "$unitOfMeasure",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    Note.find({
      userId,
      date: { $in: arrayOfDates },
    })
      .sort({ date: 1 })
      .select("note date"),
  ]);

  const metricTypes = ["Anxiety", "Sleep Quality", "Energy", "Weight"];

  // Maybe optimise this if slow on server and defo put as own function
  let combinedDataByDate = arrayOfDates.map((date) => {
    const foundMetrics = healthMetrics.find(
      (m) => m._id.toISOString() === date.toISOString()
    ) || { metrics: [] };
    const foundDiaryDay = diaryDays.find(
      (d) => d.date.toISOString() === date.toISOString()
    );
    const foundNote = notes.find(
      (d) => d.date.toISOString() === date.toISOString()
    );
    // Ensure all metrics are present, even if they have null values
    let metrics = metricTypes.map((metricType) => {
      const metricData = foundMetrics.metrics.find(
        (m) => m.metric === metricType
      );
      return {
        [metricType]: {
          metricValue: metricData ? metricData.metricValue : null,
          unitOfMeasure: metricData ? metricData.unitOfMeasure : null,
        },
      };
    });

    return {
      date: date,
      diaryDetails: foundDiaryDay
        ? {
            fastedState: foundDiaryDay.fastedState,
            diaryDayState: foundDiaryDay.diaryDayState,
          }
        : { fastedState: false, diaryDayState: "empty" },
      metrics: metrics,
      note: foundNote, // Add the notes array to each day's data
    };
  });

  return {
    timelineWeek,
    daysPassed: differenceInDays,
    weeksData: combinedDataByDate,
  };
}

module.exports = {
  getRecentTimelineWeek,
  getAllTimelineWeeks,
  getTimelineWeek,
};
