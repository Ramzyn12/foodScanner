const express = require("express");
const router = express.Router();
const { signUpUser, signUpUserApple } = require("../controllers/authController");

router.route("/signUp").post(signUpUser);
router.route("/signUpApple").post(signUpUserApple);

module.exports = router;
