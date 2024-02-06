const mongoose = require("mongoose");

const DiaryDaySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    consumedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    score: Number, //calculate from consumed foods somehow? methods or something
    date: { type: Date, required: true }, // Just the date, no time part
    image_url: {type: String}
  },
  {
    timestamps: true,
  }
);

DiaryDaySchema.index({ userId: 1, date: -1 }, { unique: true }); // Ensure unique diary per day for each user

module.exports = mongoose.model("DiaryDay", DiaryDaySchema);