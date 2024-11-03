const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cafeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    photos: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
    },
    status: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    link_google: {
      type: String,
      required: [true, "Link is required"],
    },
    latitude: {
      type: Number,
      required: true, // Set required if you want this field to be mandatory
    },
    longitude: {
      type: Number,
      required: true, // Set required if you want this field to be mandatory
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Cafe = mongoose.model("Cafe", cafeSchema);

module.exports = Cafe;
