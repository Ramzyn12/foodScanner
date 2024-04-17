const mongoose = require("mongoose");

const HealthMetricSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  metric: {
    type: String,
    required: true,
    enum: ['Weight', 'Anxiety', 'Energy', 'Sleep Quality']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  metricValue: {
    type: Number,
    required: true,
    // Add custom validation if needed, depending on the metricType like 1 - 10 if not weight
  },
  unitOfMeasure: {
    type: String,
    enum: ['kg', 'lbs'],
    required: function() { return this.metric === 'Weight'; }, 
  },
  runningAverage: {
    type: Number,
    // required: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("HealthMetric", HealthMetricSchema);
