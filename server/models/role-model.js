const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const Role = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    subForumAccess: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "subForum",
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", Role);
