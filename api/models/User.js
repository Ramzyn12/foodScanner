const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
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
    // password: {
    //   type: String,
    //   required: true,
    // },
    avatar: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: "I like skiing",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ username: 'text' });

module.exports = mongoose.model("User", userSchema);
