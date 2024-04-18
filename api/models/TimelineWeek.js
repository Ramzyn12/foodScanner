const mongoose = require("mongoose");

const TimelineWeekSchema = new mongoose.Schema(
  {
    week: { type: Number },
    subtitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    svg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("TimelineWeek", TimelineWeekSchema);
