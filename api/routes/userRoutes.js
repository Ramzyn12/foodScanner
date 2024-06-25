const express = require("express");
const router = express.Router();
const {
  signUpUser,
  signUpUserApple,
  addFirstLastName,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addUserNames,
  removeUser,
  getUserNames,
} = require("../controllers/userController");
const {
  nameUpdateValidator,
} = require("../middleware/validators/authValidators");
const { default: rateLimit } = require("express-rate-limit");
const { TooManyRequestsError } = require("../utils/error");

const addUserNameLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 10,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError("Too many adding user name", {
      limit: options.limit,
      window: options.windowMs,
    });
  },
});

const getUserNameLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  limit: 10,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError("Too many adding user name", {
      limit: options.limit,
      window: options.windowMs,
    });
  },
});

const deleteUserLimiter = rateLimit({
  windowMs: 1 * 60 * 1000 * 60 * 3, // 3 hours
  limit: 10,
  handler: (req, res, next, options) => {
    throw new TooManyRequestsError("Too many delete user requests", {
      limit: options.limit,
      window: options.windowMs,
    });
  },
});

// Going to use device storage for haptics

router
  .route("/names")
  .post(authMiddleware, addUserNameLimiter, nameUpdateValidator, addUserNames)
  .get(authMiddleware, getUserNameLimiter, getUserNames);

router
  .route("/removeUser/:firebaseId")
  .delete(authMiddleware, deleteUserLimiter, removeUser);
// router.route("/names").post(authMiddleware, addUserInformation);

module.exports = router;
