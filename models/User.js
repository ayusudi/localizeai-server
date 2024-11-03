const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (value) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Email must include @ and .",
      },
    },
    bio: {
      type: String,
    },
    status_username: {
      type: Boolean,
    },
    profile: {
      type: String, // Allows for an object with flexible keys
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
