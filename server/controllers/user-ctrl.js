const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../passportConfig")(passport);

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
} = require("../authenticate");


module.exports = {
  loggedInUser: function (req, res) {
    res.send(req.user);
  },

  registerUser: async function (req, res) {
    if (!req.body.email) {
      res.statusCode = 500;
      res.send({
        name: "EmailError",
        message: "An Email is required",
      });
    } else {
      User.register(
        new User({ username: req.body.username }),
        req.body.password,
        (err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            const token = getToken({ _id: user._id });
            const refreshToken = getRefreshToken({ _id: user._id });
            user.refreshToken.push({ refreshToken });
            user.save((err, user) => {
              if (err) {
                res.statusCode = 500;
                res.send(err);
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
                res.send({ success: true, token });
              }
            });
          }
        }
      );
    }
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
