const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema(
  {
    barcode: { type: String, required: true, unique: true },
    name: { type: String },
    brand: { type: String }, //Maybe add required
    ingredients: [String],
    additives: [String],
    image_url: String,
    processedScore: { type: Number, required: true, min: 0, max: 100 },
    processedState: { type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoodItem", FoodItemSchema);
