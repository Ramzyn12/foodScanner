const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple, addFirstLastName } = require("../controllers/authController");
const { signUpValidator, signUpAppleValidator } = require("../middleware/validators/authValidators");


// Not using rate limiter here since firebase auth handles that 
router.route("/signUp").post(signUpValidator, signUpUser);
router.route("/signUpApple").post(signUpAppleValidator, signUpUserApple);

module.exports = router;
