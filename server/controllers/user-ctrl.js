const User = require("../models/user-model");

module.exports = {
  registerUser: function (req, res) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        sucess: false,
        error: "You must provide a user",
      });
    }

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
