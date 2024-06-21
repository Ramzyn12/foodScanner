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

  res.status(200).json(latestTimelineWeek);
};

const getAllTimelineWeeks = async (req, res) => {
  const userId = req.user._id;
  // throw new Error('')

  const timelineWeeks = await timelineService.getAllTimelineWeeks({ userId });

  res.status(200).json(timelineWeeks);
};

const getTimelineWeek = async (req, res) => {
  const userId = req.user._id;
  const { week } = req.params;

  const timelineWeekData = await timelineService.getTimelineWeek({
    userId,
    week,
  });

  res.status(200).json(timelineWeekData);
};

module.exports = {
  getRecentTimelineWeek,
  getAllTimelineWeeks,
  getTimelineWeek,
};
