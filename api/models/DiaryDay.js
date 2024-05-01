const mongoose = require("mongoose");

const DiaryDaySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    consumedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    consumedSingleFoods: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SingleFood" },
    ],
    score: Number, //calculate from consumed foods somehow? methods or something
    date: { type: Date, required: true }, // Just the date, no time part
    image_url: { type: String },
    diaryDayState: {
      type: String,
      enum: ["processed", "unprocessed", "empty"],
      default: "empty",
    },
    fastedState: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

DiaryDaySchema.index({ userId: 1, date: -1 }, { unique: true });

DiaryDaySchema.methods.updateDiaryDayState = async function () {
  await this.populate([
    { path: "consumedFoods", select: "processedState" },
    { path: "consumedSingleFoods", select: "processedState" },
  ]);

  const combinedFoods = [...this.consumedFoods, ...this.consumedSingleFoods];

  if (combinedFoods.length === 0) {
    this.diaryDayState = "empty"; // or null
  } else if (
    combinedFoods.some((food) => food.processedState === "Processed")
  ) {
    this.diaryDayState = "processed";
    this.fastedState = false
  } else {
    this.diaryDayState = "unprocessed";
    this.fastedState = false
  }

  await this.save();
};

module.exports = mongoose.model("DiaryDay", DiaryDaySchema);
