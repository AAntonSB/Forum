const express = require("express");
const router = express.Router();
const Reply = require("../models/reply-model");
const Post = require("../models/post-model");
const { verifyUser, authRole } = require("../authenticate");
const { roleAuthMethods } = require("../helperFunctions");

router.post("", verifyUser, (req, res) => {
  Post.findOne({ _id: req.body.postID }, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      res.statusCode = 500;
      res.send({ sucess: false, error: "Post dosen't exist in db" });
    }
    if (doc.locked) {
      res.statusCode = 400;
      res.send({ sucess: false, error: "Thread is locked" });
    }
  }).then((obj) => {
    const reply = new Reply({
      text: req.body.text,
      warning: false,
      user: req.user._id,
      post: obj._id,
    });
    reply.save((err, reply) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        res.send({ success: true, reply });
      }
    });
  });
});

router.post(
  "/warning",
  verifyUser,
  (req, res, next) => {
    authRole({
      method: roleAuthMethods.MATCH_AND_APPLY,
      subForumID: req.body.postID,
    });
    next();
  },
  (req, res) => {
    Post.findOne({ _id: req.body.postID }, (err, doc) => {
      if (err) throw err;
      if (!doc) {
        res.statusCode = 500;
        res.send({ sucess: false, error: "Post dosen't exist in db" });
      }
      if (doc.locked) {
        res.statusCode = 400;
        res.send({ sucess: false, error: "Thread is locked" });
      }
    }).then((obj) => {
      const reply = new Reply({
        text: req.body.text,
        warning: true,
        user: req.user._id,
        post: obj._id,
      });
      reply.save((err, reply) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.send({ success: true, reply });
        }
      });
    });
  }
);

router.get("", (req, res) => {
  Post.findOne({ _id: req.query.id }, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      res.statusCode = 500;
      res.send({ success: false, error: "This post dosen't exist in the db" });
    }
  })
    .then((obj) => {
      Reply.find({ post: obj._id }, (err, reply) => {
        if (err) {
          return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, data: reply });
      });
    })
    .catch((err) => console.log(err));
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
  async (req, res) => {
    Reply.deleteOne({ _id: req.body.replyID }).then(() =>
      res.status(200).json({ success: true })
    );
  }
);

module.exports = router;
