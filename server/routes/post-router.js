const express = require("express");

const PostCtrl = require("../controllers/post-ctrl");

const router = express.Router();

router.get("/post", PostCtrl.getPosts);
router.post("/post", PostCtrl.createPost);

module.exports = router;
