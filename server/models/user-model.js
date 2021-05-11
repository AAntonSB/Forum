const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("./helperFunctions");

const User = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: {
      type: String,
      default: genUUID(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
