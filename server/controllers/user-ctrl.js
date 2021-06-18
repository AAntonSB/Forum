const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../passportConfig")(passport);

module.exports = {
  loggedInUser: function (req, res) {
    res.send(req.user);
  },

  registerUser: async function (req, res) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        sucess: false,
        error: "You must provide a user",
      });
    }
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(body.email)) {
      return res.status(440).json({
        sucess: false,
        error: "You must submit a properly formatted email adress.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.salt = salt;
    body.password = hashedPassword;

    User.findOne({ email: body.email }, (err, doc) => {
      if (err) throw err;
      if (doc) return res.send("user already exists");

      console.log(body);

      const user = new User(body);

      if (!user) {
        return res.status(400).json({ success: false, error: err });
      }

      user
        .save()
        .then(() => {
          return res.status(201).json({
            sucess: true,
            id: user.id,
            message: "User created",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "User not created",
          });
        });
    });
  },

  loginUser: function (req, res, next) {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("User dosen't exist");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Succesfully authenticated");
        });
      }
    })(req, res, next);
  },

  deleteUser: async function (req, res) {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }

      return res.status(200).json({ success: true, data: user });
    }).catch((err) => console.log(err));
  },

  getUserById: async function (req, res) {
    await User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      return res.status(200).json({ success: true, data: user });
    }).catch((err) => console.log(err));
  },

  getUsers: async function (req, res) {
    await User.find({}, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user.length) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      return res.status(200).json({ success: true, data: user });
    }).catch((err) => console.log(err));
  },
};
