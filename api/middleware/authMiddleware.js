const admin = require("../firebase-server");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const firebaseToken = req.headers.authorization?.split(" ")[1];
    let firebaseUser;
    if (firebaseToken) {
      firebaseUser = await admin.auth().verifyIdToken(firebaseToken);
    }

    if (!firebaseUser) {
      return res.status(401).json("Firebase user not verified...");
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
      return res.status(402).json("No user created yet");
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
