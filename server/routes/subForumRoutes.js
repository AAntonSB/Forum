const express = require("express");
const router = express.Router();
const SubForum = require("../models/sub-forum-model");
const { roleAuthMethods } = require("../helperFunctions");

const { verifyUser, authRole } = require("../authenticate");

router.get("", (req, res) => {
  SubForum.find({}, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user.length) {
      return res.status(404).json({ success: false, error: `User not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
});

router.post("", (req, res) => {
  const subForum = new SubForum({ title: req.body.title });
  subForum.save((err, subForum) => {
    if (err) {
      res.statusCode = 500;
      res.send(err);
    } else {
      if (subForum.locked) {
        res.statusCode = 500;
        res.send(err);
      }
      res.send({ success: true, subForum });
    }
  });
});

router.delete(
  "",
  verifyUser,
  (req, res, next) => {
    authRole({
      method: roleAuthMethods.MATCH_AND_APPLY,
      subForumID: req.body.subForumID,
    });
    next();
  },
  (req, res) => {
    SubForum.findOneAndDelete({ _id: req.body.subForumID }, (err, subForum) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      return res.status(200).json({ success: true });
    }).catch((err) => console.log(err));
  }
);

module.exports = router;
