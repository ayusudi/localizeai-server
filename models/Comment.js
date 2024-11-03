const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
    },
    optional: {
      type: String,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post is required"],
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner user is required"],
    },
    cafe: {
      type: Schema.Types.ObjectId,
      ref: "Cafe",
      required: [true, "Cafe is required"],
    },
    status: {
      type: String,
    },
    sentiment: {
      type: String,
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
