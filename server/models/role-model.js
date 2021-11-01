const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    subForumAccess: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("roles", Role);
