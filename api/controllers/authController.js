const User = require("../models/User");
const admin = require("../firebase-server");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const axios = require("axios");
const verifyAppleToken = require("../utils/verifyAppleToken");
const { BadRequestError } = require("../utils/error");
const DiaryDay = require("../models/DiaryDay");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");



const signUpUser = async (req, res) => {
  const { email, password, userInfo } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await userService.createUser(email, password, userInfo);
  res.status(201).json(user);
};



const signUpUserApple = async (req, res) => {
  const { email, uid, idToken, userInformation } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await userService.createAppleUser(email, uid, idToken, userInformation)
  res.status(201).json(user)
};



// const addFirstLastName = async (req, res) => {
//   const { firstName, lastName, firebaseId } = req.body;

//   if (!firstName || !lastName) {
//     return res.status(400).json({
//       error: "Invalid request body. Must contain firstName, lastName for user.",
//     });
//   }

//   const newUser = await User.findOneAndUpdate(
//     { firebaseId },
//     { firstName, lastName },
//     { new: true }
//   );

//   if (!newUser) throw new Error("Somethings gone wrong with updating names");

//   res.json({ message: "First and last name added!", user: newUser });
// };

module.exports = { signUpUser, signUpUserApple };
