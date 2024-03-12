const { body } = require("express-validator");

const signUpValidator = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const signUpAppleValidator = [
  body("email").isEmail().withMessage("Must be a valid email address"),
];

const nameUpdateValidator = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
];

module.exports = { signUpValidator, signUpAppleValidator, nameUpdateValidator };
