const Post = require("../models/post-model");
const SubForum = require("../models/sub-forum-model");

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
  createPost: async function (req, res, next) {
    const body = req.body;

    if (!body) {
      return res.send().json({
        success: false,
        error: "You must provide a subForum",
      });
    }

    Post.findOne({ title: body.title }, (err, doc) => {
      if (err) throw err;
      if (doc) return res.send("Same title post exists");

      const post = new Post(body);

      if (!post) {
        return res.status(400).json({ success: false, error: err });
      }

      post
        .save()
        .then(() => {
          return res.status(201).json({
            success: true,
            id: post.id,
            message: "Post created",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: "Post not created",
          });
        });
    });
  },
};
