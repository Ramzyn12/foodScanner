const mongoose = require("mongoose");

// const GroceryItemSchema = new mongoose.Schema({
//   foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
//   checked: { type: Boolean, required: true, default: false },
// });

const GroceryItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'groceries.itemModel'
  },
  itemModel: {
    type: String,
    required: true,
    enum: ['FoodItem', 'SingleFood'] // Specifies the models to which `item` can refer
  },
  checked: { type: Boolean, required: true, default: false },
});

const GrocerySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groceries: [GroceryItemSchema],
    sortPreference: {
      type: String,
      enum: ['Manual', 'Processed Score', 'Date'],
      default: 'Manual',
    },
    itemOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem' }], // This holds the order of IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grocery", GrocerySchema);
