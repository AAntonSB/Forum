const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const SubForum = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Post",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subForums", SubForum);
