const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple, addFirstLastName } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { addUserNames } = require("../controllers/userController");
const { nameUpdateValidator } = require("../middleware/validators/authValidators");

router.route("/names").post(authMiddleware, nameUpdateValidator, addUserNames);
// router.route("/names").post(authMiddleware, addUserInformation);


module.exports = router;
