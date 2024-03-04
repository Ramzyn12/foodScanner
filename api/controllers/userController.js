const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const SingleFood = require("../models/SingleFood");
const User = require("../models/User");
const { NotFoundError } = require("../utils/error");

const addUserNames = async (req, res) => {
  const userId = req.user._id; // Assuming req.user is populated from your auth middleware
  const { firstName, lastName } = req.body; // Extract the userInfo from the request body

  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true } // This option returns the document after update was applied and runs schema validators
    );

  if (!user) throw new NotFoundError("Not found user to update name");

  res.json(user)
};

module.exports = {
  addUserNames,
};
