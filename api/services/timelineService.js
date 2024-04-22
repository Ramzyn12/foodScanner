const { differenceInCalendarDays } = require("date-fns");
const DiaryDay = require("../models/DiaryDay");
const TimelineWeek = require("../models/TimelineWeek");


async function getRecentTimelineWeek({ userId }) {

  const recentDiaryDay = await DiaryDay.findOne({ userId: userId }).sort({
    date: 1,
  });

  if (!recentDiaryDay) {
    return res
      .status(404)
      .json({ message: "No diary days found for this user." });
  }
  const today = new Date();
  const lastDiaryDate = new Date(recentDiaryDay.date);
  const differenceInDays = differenceInCalendarDays(today, lastDiaryDate);

  const week = Math.ceil(differenceInDays / 7)
  const currentDay = (differenceInDays % 7) 

  const latestTimelineWeek = await TimelineWeek.findOne({week: week}).lean()

  return {...latestTimelineWeek, currentDay: currentDay};
}

async function getAllTimelineWeeks({userId}) {
  const diaryDays = await DiaryDay.find({ userId: userId }).sort({
    date: 1,
  });

  const recentDiaryDay = diaryDays[0]

  if (!recentDiaryDay) {
    return res
      .status(404)
      .json({ message: "No diary days found for this user." });
  }

  const today = new Date();
  const lastDiaryDate = new Date(recentDiaryDay.date);
  const differenceInDays = differenceInCalendarDays(today, lastDiaryDate);

  const timelineWeeks = await TimelineWeek.find().select('title subtitle svg week').sort({week: 1})

  return {timelineWeeks, daysSinceStart: differenceInDays};
}

module.exports = {
  getRecentTimelineWeek,
  getAllTimelineWeeks
};
