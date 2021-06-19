const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { genUUID } = require("../helperFunctions");

const User = new Schema(
  {
    id: {
      type: String,
      default: genUUID(),
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },
    salt: {
      type: String,
      default: genUUID(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
