const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const Post = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    locked: { type: Boolean, required: true },
    replys: {
      type: [String],
      default: [],
    },
    user: {
      type: String,
      required: true,
    },
    subForum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
