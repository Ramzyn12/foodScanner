const admin = require("../firebase-server");
const DiaryDay = require("../models/DiaryDay");
const User = require("../models/User");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  TooManyRequestsError,
  ConflictError,
} = require("../utils/error");
const verifyAppleToken = require("../utils/verifyAppleToken");

function handleFirebaseError(err) {
  console.error(err); // Log the original error for debugging purposes

  switch (err.code) {
    case "auth/email-already-exists":
      throw new BadRequestError(
        "User account already exists with the given email address."
      );
    case "auth/weak-password":
      throw new BadRequestError("The password is not strong enough.");
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-email":
    case "auth/invalid-credential":
      throw new UnauthorizedError("Incorrect email or password");
    case "auth/too-many-requests":
      throw new TooManyRequestsError(
        "Too many requests. Please try again later."
      );
    case "auth/user-disabled":
      throw new BadRequestError(
        "This account has been disabled. Please contact support."
      );
    case "auth/account-exists-with-different-credential":
      throw new ConflictError(
        "An account already exists with the same email address but different sign-in credentials."
      );
    default:
      // Throw a generic error or rethrow the original error
      throw new Error("An error occurred while processing your request.");
  }
}

async function createUser(email, password, userInfo) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newFirebaseUser = await admin
    .auth()
    .createUser({
      email,
      password,
    })
    .catch(handleFirebaseError);

  // If firebase user creation successful
  const user = await User.create({
    email,
    firebaseId: newFirebaseUser.uid,
    userInformation: userInfo,
  });

  await DiaryDay.create({
    userId: user._id,
    date: today,
  });

  const customToken = await admin.auth().createCustomToken(newFirebaseUser.uid);

  return {
    token: customToken,
    firebaseId: newFirebaseUser.uid,
    message: "Account created successfully. Please sign in.",
  };
}

async function createAppleUser(email, uid, idToken, userInformation) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  //ALSO NEED TO VALIDATE A NONCE TO HELP AVOID REPLAY ATTACKS

  try {
    await verifyAppleToken(idToken);
  } catch (error) {
    throw new BadRequestError("Invalid Apple ID token.");
  }

  let user = await User.findOneAndUpdate(
    { email, firebaseId: uid },
    { $setOnInsert: { email, firebaseId: uid, userInformation } },
    { new: true, upsert: true, runValidators: true }
  );

  return user;
}

async function updateFirstLastName(firstName, lastName, userId) {
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true }
  );

  if (!user) throw new NotFoundError("User Id is most likely invalid");

  return user;
}

module.exports = { createUser, createAppleUser, updateFirstLastName };
