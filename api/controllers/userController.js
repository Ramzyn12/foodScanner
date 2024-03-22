const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const User = require("../models/User");
const { NotFoundError } = require("../utils/error");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");

const addUserNames = async (req, res) => {
  const userId = req.user._id;
  const { firstName, lastName } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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


  const message = await userService.removeUser(
    firebaseId
  );

  res.json({ message, userId });
};

module.exports = {
  addUserNames,
  removeUser
};
