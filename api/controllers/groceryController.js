const DiaryDay = require("../models/DiaryDay");
const FoodItem = require("../models/FoodItem");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

const addFoodToGroceryList = async (req, res) => {
  const user = req.user._id;
  const {
    barcode,
    singleFoodId,
    name,
    brand,
    ingredients,
    additives,
    processedScore,
    image_url,
  } = req.body;

  let item, itemModel;

  if (barcode) {
    item = await FoodItem.findOne({ barcode: barcode });
    if (!item) {
      item = await FoodItem.create(req.body);
    }
    itemModel = "FoodItem";
  } else if (singleFoodId) {
    item = await SingleFood.findById(singleFoodId);
    itemModel = "SingleFood";
  }

  if (!item) {
    return res.status(404).send("Food item not found or created.");
  }

  const groceryItem = { item: item._id, itemModel, checked: false };

  const groceries = await Grocery.findOneAndUpdate(
    { userId: user },
    {
      $addToSet: { groceries: groceryItem },
      $push: { itemOrder: item._id }, // Add item ID to the end of the itemOrder array
    },
    { new: true, upsert: true }
  );

  res.status(200).json(groceries);
};

const getGroceryList = async (req, res) => {
  const userId = req.user._id; // Assuming you have user information in req.user

  try {
    const groceryList = await Grocery.findOne({ userId: userId }).populate(
      "groceries.item"
    );

    // console.log(groceryList, "List backend");
    if (!groceryList) {
      return res.status(404).send("Grocery list not found");
    }

    res.status(200).json(groceryList);
  } catch (error) {
    console.error("Error fetching grocery list:", error);
    res.status(500).send("Error fetching grocery list");
  }
};

const removeFoodFromGroceryList = async (req, res) => {
  const userId = req.user._id;
  const { barcode, singleFoodId } = req.body;

  try {
    let itemId;

    // Check if barcode is provided and find the FoodItem
    if (barcode) {
      const foodItem = await FoodItem.findOne({ barcode: barcode });
      if (!foodItem) {
        return res.status(404).send("Food item with given barcode not found.");
      }
      itemId = foodItem._id;
    }
    // Check if singleFoodId is provided and use it directly
    else if (singleFoodId) {
      const singleFood = await SingleFood.findById(singleFoodId);
      if (!singleFood) {
        return res.status(404).send("Single food item not found.");
      }
      itemId = singleFood._id;
    } else {
      return res.status(400).send("No valid identifier provided.");
    }

    // Remove the grocery item that references the found FoodItem or SingleFood
    const updatedGroceryList = await Grocery.findOneAndUpdate(
      { userId: userId },
      {
        $pull: { groceries: { item: itemId }, itemOrder: itemId }, // Corrected line here
      },
      { new: true }
    );

    if (!updatedGroceryList) {
      return res
        .status(404)
        .send("Grocery list not found or item could not be removed.");
    }

    res.status(200).json(updatedGroceryList);
  } catch (error) {
    console.error("Error removing food from grocery list:", error);
    res.status(500).send("Error removing food from grocery list");
  }
};

const toggleCheckedState = async (req, res) => {
  const userId = req.user._id;
  const { groceryItemId } = req.params; // Get the grocery item ID from the request parameters

  try {
    const groceryList = await Grocery.findOne({ userId: userId });

    if (!groceryList) {
      return res.status(404).send("Grocery list not found.");
    }

    // Find the grocery item and toggle its checked state
    const groceryItem = groceryList.groceries.id(groceryItemId);
    if (!groceryItem) {
      return res.status(404).send("Grocery item not found.");
    }
    groceryItem.checked = !groceryItem.checked; // Toggle the checked state

    await groceryList.save(); // Save the updated grocery list document

    res.status(200).json(groceryItem);
  } catch (error) {
    console.error("Error toggling checked state:", error);
    res.status(500).send("Error toggling checked state of grocery item");
  }
};

const uncheckAllItems = async (req, res) => {
  const userId = req.user._id;

  try {
    const groceryList = await Grocery.findOne({ userId: userId });
    if (!groceryList) {
      return res.status(404).send("Grocery list not found.");
    }

    // Set checked to false for all items
    groceryList.groceries.forEach((item) => {
      item.checked = false;
    });

    await groceryList.save(); // Save the updated grocery list document

    res.status(200).json(groceryList);
  } catch (error) {
    console.error("Error unchecking all items:", error);
    res.status(500).send("Error unchecking all grocery items");
  }
};

const updateSortPreference = async (req, res) => {
  const userId = req.user._id;
  const { sortPreference } = req.body; // Grab the preference from the request body

  const groceries = await Grocery.findOneAndUpdate(
    { userId },
    { sortPreference },
    { new: true }
  );

  if (!groceries) {
    throw new Error("Grocery List not found");
  }

  res
    .status(200)
    .json({ message: "Sort preference updated successfully", groceries });
};

const updateOrder = async (req, res) => {
  const userId = req.user._id;
  const { itemOrder } = req.body; // Array of item IDs in their new order

  try {
    const groceryList = await Grocery.findOneAndUpdate(
      { userId },
      { $set: { itemOrder } },
      { new: true }
    );

    if (!groceryList) {
      return res.status(404).send("Grocery list not found.");
    }

    res.status(200).json(groceryList);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Failed to update order");
  }
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
