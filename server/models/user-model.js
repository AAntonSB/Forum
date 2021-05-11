const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    id: {
      type: String,
      default: function genUUID() {
        return uuid.v1();
      },
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: {
      type: String,
      default: function genUUID() {
        return uuid.v1();
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", Movie);
