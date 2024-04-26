const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null,
      // required: true,
      trim: true,
      // unique: [true, "username already taken!"],
    },
    lastName: {
      type: String,
      default: null,
      // required: true,
      trim: true,
      // unique: [true, "username already taken!"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firebaseId: {
      type: String,
      required: true
    },
    hapticsEnabled: {
      type: Boolean,
      default: true
    },
    userInformation: {
      age: {
        type: Number,
        default: null,
      },
      gender: {
        type: String,
        default: null,
        enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'], // Adjust based on your requirements
      },
      processedFoodConsumption: {
        type: Number, // Assuming this will be stored as a description e.g., "2 days"
        default: null,
      },
      MedicalConditions: [{
        type: String,
        default: [],
      }],
      Motivations: [{
        type: String,
        default: [],
      }],
      LikeFeatures: [{
        type: String,
        default: [],
      }],
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ username: 'text' });

module.exports = mongoose.model("User", userSchema);
