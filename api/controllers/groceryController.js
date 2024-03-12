const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");
const groceryService = require("../services/groceryService");

const addFoodToGroceryList = async (req, res) => {
  const userId = req.user._id;
  const foodDetails = req.body;

  const groceries = await groceryService.addFoodToGroceryList({
    userId,
    foodDetails,
  });

  res.status(200).json(groceries);
};

const getGroceryList = async (req, res) => {
  const userId = req.user._id;

  const groceryList = await groceryService.getGroceryList({ userId });

  res.status(200).json(groceryList);
};

const removeFoodFromGroceryList = async (req, res) => {
  const userId = req.user._id;
  const { barcode, singleFoodId } = req.body;

  const updatedGroceryList = await groceryService.removeFoodFromGroceryList({
    userId,
    barcode,
    singleFoodId,
  });

  res.status(200).json(updatedGroceryList);
};

const toggleCheckedState = async (req, res) => {
  const userId = req.user._id;
  const { groceryItemId } = req.params;

  const groceryItem = await groceryService.toggleCheckedState({
    userId,
    groceryItemId,
  });

  res.status(200).json(groceryItem);
};

const uncheckAllItems = async (req, res) => {
  const userId = req.user._id;

  const groceryList = await groceryService.uncheckAllItems({ userId });

  res.status(200).json(groceryList);
};

const updateSortPreference = async (req, res) => {
  const userId = req.user._id;
  const { sortPreference } = req.body; // Grab the preference from the request body

  const groceries = await groceryService.updateSortPreference({
    userId,
    sortPreference,
  });

  res
    .status(200)
    .json({ message: "Sort preference updated successfully", groceries });
};

const updateOrder = async (req, res) => {
  const userId = req.user._id;
  const { itemOrder } = req.body; // Array of item IDs in their new order

  const groceryList = await groceryService.updateOrder({userId, itemOrder})

  res.status(200).json(groceryList);
};

module.exports = {
  addFoodToGroceryList,
  getGroceryList,
  removeFoodFromGroceryList,
  toggleCheckedState,
  uncheckAllItems,
  updateSortPreference,
  updateOrder,
};
