const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const SubForum = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    locked: { type: Boolean },
    posts: {
      type: [String],
      ref: "Post",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubForum", SubForum);
