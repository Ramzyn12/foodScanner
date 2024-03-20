const mongoose = require("mongoose");

const DiaryDaySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    consumedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    consumedSingleFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "SingleFood" }],
    score: Number, //calculate from consumed foods somehow? methods or something
    date: { type: Date, required: true }, // Just the date, no time part
    image_url: { type: String },
  },
  {
    timestamps: true,
  }
);

DiaryDaySchema.index({ userId: 1, date: -1 }, { unique: true }); 

// IF INCLUDE SINGLEFOODS
DiaryDaySchema.methods.updateAverageScore = async function () {
  // Populate both consumedFoods and consumedSingleFoods
  await this.populate([
    { path: "consumedFoods", select: "processedScore" },
    { path: "consumedSingleFoods", select: "processedScore" },
  ]);

  // Combine the scores from both arrays
  const combinedFoods = [...this.consumedFoods, ...this.consumedSingleFoods];

  if (combinedFoods.length > 0) {
    const totalScore = combinedFoods.reduce(
      (acc, food) => acc + food.processedScore,
      0
    );
    let averageScore = totalScore / combinedFoods.length;

    // Round up the score using Math.ceil
    averageScore = Math.ceil(averageScore);

    // Ensure the score does not exceed 100
    this.score = Math.min(averageScore, 100);
  } else {
    this.score = undefined; // Set to 0 if there are no food items
  }

  await this.save(); // Save the document with the updated score
};


module.exports = mongoose.model("DiaryDay", DiaryDaySchema);
