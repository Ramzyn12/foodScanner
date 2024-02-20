const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple, addFirstLastName } = require("../controllers/authController");

router.route("/signUp").post(signUpUser);
router.route("/signUpApple").post(signUpUserApple);
router.route("/names").post(addFirstLastName);

module.exports = router;
