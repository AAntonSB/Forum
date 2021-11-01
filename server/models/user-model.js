const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const User = new Schema(
  {
    authStrategy: {
      type: String,
      default: "local",
    },
    email: {
      type: String,
      default: "",
    },
    comment: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: [Session],
    },
  },
  { timestamps: true }
);

User.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
