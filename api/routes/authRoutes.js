const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple, addFirstLastName } = require("../controllers/authController");
const { signUpValidator, signUpAppleValidator } = require("../middleware/validators/authValidators");

router.route("/signUp").post(signUpValidator, signUpUser);
router.route("/signUpApple").post(signUpAppleValidator, signUpUserApple);
// router.route("/names").post(nameUpdateValidator, addFirstLastName);

module.exports = router;
