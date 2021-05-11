const express = require("express");

const UserCtrl = require("../controllers/user-ctrl");

const router = express.Router();

router.post("/register", UserCtrl.registerUser);
router.post("/login", UserCtrl.loginUser);
router.delete("/user/:id", UserCtrl.deleteUser);
router.get("/user/:id", UserCtrl.getUserById);
router.get("/users", UserCtrl.getUsers);

module.exports = router;
