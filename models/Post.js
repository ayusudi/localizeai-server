const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    file: {
      type: String, // This is the BSON type for binary data
      required: [true, "File is required"],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
    },
    type: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner user is required"],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    review: {
      type: Schema.Types.Mixed, // Allows for an object with flexible keys
      default: {}, // Default empty object if no rating provided
    },
    private_status: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
