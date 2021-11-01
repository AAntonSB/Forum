const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { roleAuthMethods } = require("../helperFunctions");

const {
  getToken,
  COOKIE_OPTIONS,
  getRefreshToken,
  verifyUser,
  authRole,
} = require("../authenticate");

router.post("/signup", (req, res) => {
  // Verify that email is not empty
  if (!req.body.email) {
    res.statusCode = 500;
    res.send({
      name: "EmailError",
      message: "An email is required",
    });
  } else {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          user.email = req.body.email;
          const token = getToken({ _id: user._id });
          const refreshToken = getRefreshToken({ _id: user._id });
          user.refreshToken.push({ refreshToken });
          user.save((err, user) => {
            if (err) {
              res.statusCode = 500;
              res.send(err);
            } else {
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
              res.send({ success: true, token });
            }
          });
        }
      }
    );
  }
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  const refreshToken = getRefreshToken({ _id: req.user._id });
  User.findById(req.user._id).then(
    (user) => {
      user.refreshToken.push({ refreshToken });
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
          res.send({ success: true, token });
        }
      });
    },
    (err) => next(err)
  );
});

router.post("/refreshToken", (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  if (refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );
            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
});

router.get("/me", verifyUser, (req, res) => {
  res.send(req.user);
});

router.get("/logout", verifyUser, (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );
      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS);
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
});

router.get(
  "",
  verifyUser,
  authRole({ method: roleAuthMethods.GET_ROLES }),
  (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!users.length) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }

      const superAdminIndex = users
        .map((x) => x.role)
        .indexOf(process.env.SUPER_ADMIN_ID);
      users.splice(superAdminIndex, 1);

      if (!res.locals.authClearance) {
        users = users.filter((e) => e.role !== process.env.ADMIN_ID);
      }
      return res.status(200).json({ success: true, data: users });
    }).catch((err) => console.log(err));
  }
);

router.delete(
  "",
  verifyUser,
  authRole({ method: roleAuthMethods.ADMIN }),
  async (req, res) => {
    User.deleteOne({ _id: req.body.userID }).then(() =>
      res.status(200).json({ success: true })
    );
  }
);

router.put(
  "",
  verifyUser,
  authRole({ method: roleAuthMethods.GET_ROLES }),
  (req, res) => {
    User.findById(req.body.userID, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: `User not found` });
      }
      user.comment = req.body.comment;
      if (req.body.roleID === process.env.SUPER_ADMIN_ID) {
        return res.status(418).json({ success: false, error: `absurd` });
      }
      if (!res.locals.authClearance) {
        if (req.body.roleID === process.env.SUPER_ADMIN_ID) {
          return res.status(418).json({ success: false, error: `absurd` });
        }
      }
      user.role = req.body.roleID;

      user
        .save()
        .then(() => res.status(200).json({ success: true, user: user }));
    });
  }
);

module.exports = router;
