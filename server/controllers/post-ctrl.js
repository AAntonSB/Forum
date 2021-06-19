const mongoose = require("mongoose");
const Post = require("../models/post-model");
const SubForum = require("../models/sub-forum-model");
const User = require("../models/user-model");

module.exports = {
  getPosts: async function (req, res) {
    await Post.find({}, (err, post) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!post.length) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      return res.status(200).json({ success: true, data: post });
    }).catch((err) => console.log(err));
  },

  createPost: async function (req, res) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        sucess: false,
        error: "You must provide a subForum",
      });
    }

    User.findOne({ id: body.user }, (err, doc) => {
      if (err) throw err;
      if (!doc) return res.send("You must be logged in to post");
    });

    SubForum.findOne({ id: body.subForum }, (err, doc) => {
      if (err) throw err;
      if (!doc) return res.send("You must be logged in to post");
    });

    Post.findOne({ title: body.title }, (err, doc) => {
      if (err) throw err;
      if (doc) return res.send("The sub forum already exists");

      console.log(body);

      const post = new Post(body);

      if (!post) {
        return res.status(400).json({ success: false, error: err });
      }

      post
        .save()
        .then(() => {
          return res.status(201).json({
            sucess: true,
            id: post.id,
            message: "Sub forum created",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Sub forum not created",
          });
        });
    });
  },
};
