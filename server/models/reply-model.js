const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const Reply = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    text: { type: String },
    warning: { type: Boolean },
    user: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("replies", Reply);
