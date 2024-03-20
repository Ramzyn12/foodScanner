const mongoose = require("mongoose");

const SingleFoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // nutrients: [String],
    description: String,
    image_url: String,
    processedScore: { type: Number, required: true, min: 0, max: 100 },
    processedState: { type: String, default: 'Perfect'},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SingleFood", SingleFoodSchema);
