const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const User = require("../models/User");
const { NotFoundError, ValidationError } = require("../utils/error");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");

const addUserNames = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError("Validation Error", errors.array());
  }

  //Note: Error bubbles up to next global error handler
  const user = await userService.updateFirstLastName(
    firstName,
    lastName,
    userId
  );

  res.json({ message: "Name updated successfully" });
};

const removeUser = async (req, res) => {
  const userId = req.user._id;
  const { firebaseId } = req.params;

  //Why dont we just use UserId? Maybe do that

  const message = await userService.removeUser(firebaseId);

  res.json({ message, userId });
};

const getUserNames = async (req, res) => {
  const userId = req.user._id;

  const namesObject = await userService.getUserNames(userId);

  res.json(namesObject);
};

const toggleUserHaptics = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  user.hapticsEnabled = !user.hapticsEnabled;
  await user.save();

  res.json(user);
};

const getUserHaptics = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).lean();

  res.json(user.hapticsEnabled);
};

module.exports = {
  addUserNames,
  removeUser,
  getUserNames,
  toggleUserHaptics,
  getUserHaptics,
};
