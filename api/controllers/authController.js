const User = require("../models/User");
const admin = require("../firebase-server");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const axios = require("axios");
const verifyAppleToken = require("../utils/verifyAppleToken");
const { BadRequestError } = require("../utils/error");

const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid request body. Must contain email, password for user.",
    });
  }

  try {
    const newFirebaseUser = await admin.auth().createUser({
      email,
      password,
    });

    if (newFirebaseUser) {
      const user = await User.create({
        email,
        firebaseId: newFirebaseUser.uid,
      });

      const customToken = await admin
        .auth()
        .createCustomToken(newFirebaseUser.uid);

      return res.status(200).json({
        token: customToken,
        firebaseId: newFirebaseUser.uid,
        message: "Account created successfully. Please sign in.",
      });
    }
  } catch (err) {
    console.log(err);
    if (err.code === "auth/email-already-exists") {
      return res
        .status(400)
        .json({ error: "User account already exists at email address." });
    }
    return res.status(500).json({ error: "Server error. Please try again" });
  }
};

const signUpUserApple = async (req, res) => {
  const { email, uid, idToken } = req.body;

  if (!email) {
    throw new BadRequestError(
      "Invalid request body. Must contain email for user."
    );
  }
  //ALSO NEED TO VALIDATE A NONCE TO HELP AVOID REPLAY ATTACKS
  //Implement rate limiting

  // Verify the idToken
  await verifyAppleToken(idToken);

  const user = await User.findOne({
    email,
    firebaseId: uid,
  });

  if (!user) {
    user = await User.create({
      email,
      firebaseId: uid,
    });
  }
};

const addFirstLastName = async (req, res) => {
  const { firstName, lastName, firebaseId } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({
      error: "Invalid request body. Must contain firstName, lastName for user.",
    });
  }

  const newUser = await User.findOneAndUpdate(
    { firebaseId },
    { firstName, lastName },
    { new: true }
  );

  if (!newUser) throw new Error("Somethings gone wrong with updating names");

  res.json({message: "First and last name added!", user: newUser});
};

module.exports = { signUpUser, signUpUserApple, addFirstLastName };