const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const Post = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    title: { type: String },
    text: { type: String },
    replys: {
      type: [String],
      ref: "Reply",
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
