const admin = require("firebase-admin");
const User = require("../models/User");
const serviceAccount = require("./serviceAccountKey.json");
const jwt = require("jsonwebtoken");
const {
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_APPID,
  FIREBASE_MEASUREMENTID,
  SECRET_JWT,
} = process.env;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENTID,
});

class UserController {
  static async login(req, res, next) {
    const { id_token } = req.body;
    try {
      const payload = await admin.auth().verifyIdToken(id_token);
      const profile = payload.picture.replace(/=s96-c$/, "");
      let user = await User.findOne({ email: payload.email });
      if (!user) {
        user = await User.create({
          name: payload.name,
          email: payload.email,
          status_username: false,
          profile,
        });
      }
      const access_token = jwt.sign(
        { id: user._id, email: user.email },
        SECRET_JWT
      );
      res.status(200).json({
        message: "Successfully logged in",
        access_token,
        name: user.name,
        email: user.email,
        profile: user.profile,
        username: user.username,
        status_username: user.status_username,
      });
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Unauthorized" });
    }
  }
  static async findOneByUsername(req, res, next) {
    const { username } = req.params;
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(200).json({ message: "NOT_FOUND" });
      }
      res.status(200).json({ message: "SUCCESS", ...user });
    } catch (err) {
      next(err);
    }
  }
  static async setUsername(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { username } = req.params;
      let payload = jwt.verify(access_token, SECRET_JWT);
      console.log(payload);
      let user = await User.findOne({ email: payload.email });

      console.log(user, "<<<");
      if (user) {
        user.username = username;
        user.status_username = true;

        await user.save();
        return res.status(200).json({ message: "SUCCESS", user });
      }
      throw { code: 404 };
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
