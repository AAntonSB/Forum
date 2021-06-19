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
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reply",
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", Post);
