const express = require("express");
const router = express.Router();
const Post = require("../models/post-model");
const SubForum = require("../models/sub-forum-model");
const { verifyUser, authRole } = require("../authenticate");
const { roleAuthMethods } = require("../helperFunctions");

router.get("", (req, res) => {
  Post.find({}, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user.length) {
      return res.status(404).json({ success: false, error: `Posts not found` });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
});

router.post("", verifyUser, (req, res) => {
  SubForum.findOne({ title: req.body.subForumID }, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      res.statusCode = 500;
      res.send({ sucess: false, error: "Post dosen't exist in db" });
    }

    const postData = req.body;
    post = new Post({
      title: postData.title,
      text: postData.text,
      subForum: doc._id,
      locked: false,
      user: req.user._id,
    });

    post
      .save()
      .then(() => {
        res.send({ sucess: true, error: "Post was created" });
      })
      .catch((err) => {
        res.send({ sucess: false, error: err });
      });
  });
});

router.get("/filter", (req, res) => {
  SubForum.findOne({ title: req.query.title }, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      res.statusCode = 500;
      res.send({ success: false, error: "Subforum dosen't exist in db" });
    }
  }).then((obj) => {
    Post.find({ subForum: obj._id }, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user.length) {
        return res
          .status(404)
          .json({ success: false, error: `Posts not found` });
      }
      return res.status(200).json({ success: true, data: user });
    }).catch((err) => console.log(err));
  });
});

router.get("/id", (req, res) => {
  Post.findOne({ _id: req.query.id }, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!post) {
      return res.status(404).json({ success: false, error: `Posts not found` });
    }
    return res.status(200).json({ success: true, data: post });
  }).catch((err) => console.log(err));
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
    Post.findOneAndDelete({ id: req.body.postID }, (post, err) => {
      return res.status(200).json({ success: true, data: post });
    });
  }
);

router.put(
  "/lock",
  verifyUser,
  authRole({
    method: roleAuthMethods.MATCH_AND_APPLY,
  }),
  (req, res) => {
    Post.findById(req.body.postID, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!post) {
        return res.status(400).json({ success: false, error: "no post found" });
      }
      post.locked = !post.locked;
      post.save();
      return res.status(200).json({ success: true, data: post });
    }).catch((err) => {
      console.log(err);
    });
  }
);

module.exports = router;
