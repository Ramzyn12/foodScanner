const { fromZonedTime } = require("date-fns-tz");
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
const { startSession } = require("mongoose");
const { startOfDay } = require("date-fns");
const { getCurrentDateLocal } = require("../utils/dateHelper");
const HealthMetric = require("../models/HealthMetric");
const Note = require("../models/Note");

function handleFirebaseError(err) {
  console.error(err); // Log the original error for debugging purposes

  switch (err.code) {
    case "auth/email-already-exists":
      throw new BadRequestError(
        "User account already exists with the given email address."
      );
    case "auth/weak-password":
      throw new BadRequestError("This password is not strong enough.");
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
      throw new Error("An error occurred, Please try again later");
  }
}

async function createUser(email, password, userInfo) {

  // MAY NEED TO CHANGE THIS BASED ON TIMEZONE, since node doesnt use timezone of user but 
  // Rather timezone of node env, COULD GET TIMEZONE OFFset from frontend!
  const localDate = getCurrentDateLocal()

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
    date: localDate,
  });

  const customToken = await admin.auth().createCustomToken(newFirebaseUser.uid);

  return {
    token: customToken,
    firebaseId: newFirebaseUser.uid,
    message: "Account created successfully. Please sign in.",
  };
}

async function createAppleUser(email, uid, idToken, userInformation) {

  const localDate = getCurrentDateLocal()

  try {
    await verifyAppleToken(idToken);
  } catch (error) {
    throw new BadRequestError("Invalid Apple ID token.");
  }

  // Set on insert means userInfo wont keep being overrided...
  let user = await User.findOneAndUpdate(
    { email, firebaseId: uid },
    { $setOnInsert: { email, firebaseId: uid, userInformation } },
    { new: true, upsert: true, runValidators: true }
  );

  // This works becuase we wait for backend to finish on frontend
  const existingDiaryDay = await DiaryDay.findOne({ userId: user._id });

  if (!existingDiaryDay) {
    await DiaryDay.create({
      userId: user._id,
      date: localDate,
    });
  }

  return user;
}

async function updateFirstLastName(firstName, lastName, userId) {
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true }
  );

  if (!user) throw new NotFoundError("Could not find user to update names");

  return user;
}

async function getUserNames(userId) {
  const user = await User.findById(userId).lean();

  if (!user) throw new NotFoundError("Could not find user to fetch names");
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';

  return { firstName, lastName };
}

async function removeUser(firebaseId, userId) {
  const session = await startSession();
  // throw new Error('error')

  // We do need try catch here becuase of the transaction by the way!
  try {
    session.startTransaction();
    // Maybe just need userId not firebaseId?
    const user = await User.findOneAndDelete({ firebaseId }, { session });


    if (!user) throw new NotFoundError("User was not found");

    // Assuming there's a relationship via the user's ID
    // What else do we need to delete? 
    await DiaryDay.deleteMany({ userId: user._id }, { session });
    await HealthMetric.deleteMany({ userId: user._id }, { session });
    await Note.deleteMany({ userId: user._id }, { session });

    await session.commitTransaction();
    session.endSession();
    return { message: "User and associated data deleted successfully." };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow the error to be handled by the caller
  }
}

module.exports = {
  createUser,
  createAppleUser,
  updateFirstLastName,
  removeUser,
  getUserNames,
};
