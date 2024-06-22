const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addFoodToGroceryList,
  getGroceryList,
  removeFoodFromGroceryList,
  toggleCheckedState,
  uncheckAllItems,
  updateSortPreference,
  updateOrder,
} = require("../controllers/groceryController");
const { default: rateLimit } = require("express-rate-limit");
const { TooManyRequestsError } = require("../utils/error");
const router = express.Router();

const addOrRemoveGroceryLimiter = rateLimit({
  windowMs: 1 * 60 * 500, // 30 secs
  limit: 20,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests adding or removing groceries",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const getGroceryLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 30,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests getting grocery",
      { limit: options.limit, window: options.windowMs }
    );
  },
})

const sortingLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 50,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests changing sorting preference",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const updateOrderLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 100,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests changing grocery order",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const toggleCheckedLimiter = rateLimit({
  windowMs: 1 * 60 * 500, // 30 secs
  limit: 60,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests toggling checked",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

const uncheckAllLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 60,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError(
      "Too many requests uncheck all",
      { limit: options.limit, window: options.windowMs }
    );
  },
});

router
  .route("/")
  .post(authMiddleware, addOrRemoveGroceryLimiter, addFoodToGroceryList)
  .get(authMiddleware, getGroceryLimiter, getGroceryList);
  
router.route("/sort").post(authMiddleware, sortingLimiter, updateSortPreference);
router.route("/updateOrder").post(authMiddleware, updateOrderLimiter, updateOrder);
router.route("/remove").post(authMiddleware, addOrRemoveGroceryLimiter, removeFoodFromGroceryList);
router
  .route("/:groceryItemId/toggle")
  .patch(authMiddleware, toggleCheckedLimiter, toggleCheckedState);
router.route("/uncheck-all").post(authMiddleware, uncheckAllLimiter, uncheckAllItems);

module.exports = router;
