const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple, addFirstLastName } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { addUserNames } = require("../controllers/userController");

router.route("/names").post(authMiddleware, addUserNames);
// router.route("/names").post(authMiddleware, addUserInformation);


module.exports = router;
