const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const Role = require("../models/role-model");
const { roleAuthMethods } = require("../helperFunctions");

const { verifyUser, authRole } = require("../authenticate");

router.post(
  "",
  verifyUser,
  authRole({ method: roleAuthMethods.SUPER_ADMIN }),
  (req, res) => {
    const role = new Role({ name: req.body.name });
    role.save((err, role) => {
      if (err) {
        res.statusCode = 500;
        res.send(err);
      } else {
        res.send({ success: true, role });
      }
    });
  }
);

router.get(
  "",
  verifyUser,
  authRole({ method: roleAuthMethods.GET_ROLES }),
  (req, res) => {
    Role.find({}, (err, roles) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!roles.length) {
        return res
          .status(404)
          .json({ success: false, error: `Currently no roles implemented` });
      }

      const superAdminIndex = roles
        .map((x) => x.id)
        .indexOf(process.env.SUPER_ADMIN_ID);
      roles.splice(superAdminIndex, 1);
      if (!res.locals.authClearance) {
        const adminIndex = roles.map((x) => x.id).indexOf(process.env.ADMIN_ID);
        roles.splice(adminIndex, 1);
      }
      return res.status(200).json({ success: true, data: roles });
    }).catch((err) => console.log(err));
  }
);

router.put(
  "/",
  verifyUser,
  authRole({ method: roleAuthMethods.SUPER_ADMIN }),
  (req, res) => {
    Role.findById(req.body.roleID, (err, role) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      const subForumAccess = role.subForumAccess;
      const subForum = req.body.subForumID;

      if (subForumAccess.includes(subForum)) {
        const index = subForumAccess.indexOf(subForum);
        subForumAccess.splice(index, 1);
      } else {
        subForumAccess.push(subForum);
      }
      role.save();
      return res.status(200).json({ success: true, data: role });
    }).catch((err) => {
      console.log(err);
    });
  }
);

module.exports = router;
