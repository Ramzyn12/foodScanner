const FoodItem = require("../models/FoodItem");
const Grocery = require("../models/Grocery");
const SingleFood = require("../models/SingleFood");
const { NotFoundError } = require("../utils/error");

async function addFoodToGroceryList({ userId, foodDetails }) {
  const { barcode, singleFoodId } = foodDetails;

  let item, itemModel;

  if (barcode) {
    item = await FoodItem.findOne({ barcode: barcode });
    if (!item) {
      item = await FoodItem.create(foodDetails);
    }
    itemModel = "FoodItem";
  } else if (singleFoodId) {
    item = await SingleFood.findById(singleFoodId);
    itemModel = "SingleFood";
  }

  if (!item) {
    throw new NotFoundError("Food item not found or created.");
  }

  const groceryItem = { item: item._id, itemModel, checked: false };

  const groceries = await Grocery.findOneAndUpdate(
    { userId: userId },
    {
      $addToSet: { groceries: groceryItem },
      $push: { itemOrder: item._id }, // Add item ID to the end of the itemOrder array
    },
    { new: true, upsert: true }
  );

  return groceries;
}

async function getGroceryList({ userId }) {
  const groceryList = await Grocery.findOneAndUpdate(
    { userId: userId }, // Query condition
    { $setOnInsert: { userId: userId, groceries: [] } }, // Only set on insert, not on update
    {
      new: true, // Return the modified document rather than the original
      upsert: true, // Create the document if it doesn't exist
      populate: "groceries.item", // Populate the groceries items after upsert
    }
  );

  return groceryList;
}

async function removeFoodFromGroceryList({ userId, barcode, singleFoodId }) {
  let itemId;

  if (barcode) {
    const foodItem = await FoodItem.findOne({ barcode: barcode });
    if (!foodItem) {
      return res.status(404).send("Food item with given barcode not found.");
    }
    itemId = foodItem._id;
  } else if (singleFoodId) {
    const singleFood = await SingleFood.findById(singleFoodId);
    if (!singleFood) {
      return res.status(404).send("Single food item not found.");
    }
    itemId = singleFood._id;
  }

  const updatedGroceryList = await Grocery.findOneAndUpdate(
    { userId: userId },
    {
      $pull: { groceries: { item: itemId }, itemOrder: itemId },
    },
    { new: true }
  );

  if (!updatedGroceryList) {
    throw new Error("Error trying to update grocery list");
  }

  return updatedGroceryList;
}

async function toggleCheckedState({ userId, groceryItemId }) {
  const groceryList = await Grocery.findOne({ userId: userId });

  if (!groceryList) {
    return res.status(404).send("Grocery list not found.");
  }

  // Find the grocery item and toggle its checked state
  const groceryItem = groceryList.groceries.id(groceryItemId);

  if (!groceryItem) {
    return res.status(404).send("Grocery item not found.");
  }

  groceryItem.checked = !groceryItem.checked;

  await groceryList.save();

  return groceryItem;
}

async function uncheckAllItems({ userId }) {
  const groceryList = await Grocery.findOne({ userId });

  if (!groceryList) {
    return res.status(404).send("Grocery list not found.");
  }

  groceryList.groceries.forEach((item) => {
    item.checked = false;
  });

  await groceryList.save();

  return groceryList;
}

async function updateSortPreference({ userId, sortPreference }) {
  const groceries = await Grocery.findOneAndUpdate(
    { userId },
    { sortPreference },
    { new: true }
  );

  if (!groceries) {
    throw new Error("Grocery List not found");
  }

  return groceries;
}

async function updateOrder({ userId, itemOrder }) {
  const groceryList = await Grocery.findOneAndUpdate(
    { userId },
    { $set: { itemOrder } },
    { new: true }
  );

  if (!groceryList) {
    throw new NotFoundError("Grocery list not found.");
  }

  return groceryList;
}

module.exports = {
  addFoodToGroceryList,
  getGroceryList,
  updateOrder,
  updateSortPreference,
  uncheckAllItems,
  removeFoodFromGroceryList,
  toggleCheckedState,
};
