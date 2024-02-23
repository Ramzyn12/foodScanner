const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addFoodToGroceryList, getGroceryList, removeFoodFromGroceryList, toggleCheckedState, uncheckAllItems, updateSortPreference, updateOrder } = require("../controllers/groceryController");
const router = express.Router();

router.route("/").post(authMiddleware, addFoodToGroceryList).get(authMiddleware, getGroceryList)
router.route("/sort").post(authMiddleware, updateSortPreference)
router.route("/updateOrder").post(authMiddleware, updateOrder)
router.route("/remove").post(authMiddleware, removeFoodFromGroceryList)
router.route("/:groceryItemId/toggle").patch(authMiddleware, toggleCheckedState)
router.route("/uncheck-all").post(authMiddleware, uncheckAllItems)

module.exports = router;
