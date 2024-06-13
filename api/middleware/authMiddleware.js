const admin = require("../firebase-server");
const User = require("../models/User");
const { UnauthorizedError } = require("../utils/error");

// NEED BETTER ERROR HANDLING
const authMiddleware = async (req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];
    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await admin.auth().verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      // seem to get error here becuase no firebase Token, since no header, maybe because call
      //befroe the axiosAPI can connect header from token or something??? 
      throw new UnauthorizedError('Firebase user not verified', {firebaseToken, firebaseUser})
      // return res.status(401).json("Firebase user not verified...");
    }

    // MAke this find one and update? 
    const user = await User.findOne({
      firebaseId: firebaseUser.user_id,
    });

    if (!user) {
      console.log(req.body);
      // frontend should retry? 
      //Maybe just create user here if not work
      // return
      return res.status(401).json("No user created yet");
    }

    req.user = user;

    next();
  } catch (err) {
    //Unauthorized
    console.log(err);
    res.status(403).json("Server error caught?");
  }
};

module.exports = authMiddleware;
