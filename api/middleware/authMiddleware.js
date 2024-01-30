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
      // Unauthorized
      return res.sendStatus(401);
    }

    const user = await User.findOne({
      firebaseId: firebaseUser.user_id,
    });

    if (!user) {
      // Unauthorized
      return res.sendStatus(401);
    }

    req.user = user;

    next();
  } catch (err) {
    //Unauthorized
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
