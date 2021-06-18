const express = require("express");

const SubForumCtrl = require("../controllers/sub-forum-ctrl");

const router = express.Router();

router.get("/sub-forums", SubForumCtrl.getSubForums);
router.post("/sub-forum", SubForumCtrl.addSubForum);

module.exports = router;
