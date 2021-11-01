const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";
const { roleAuthMethods } = require("./helperFunctions");
const Role = require("./models/role-model");
exports.COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};
exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};
exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};
exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.authRole = function authRole(authObject) {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return res.send("Not logged in.");
    }

    const userRole = req.user.role;

    switch (authObject.method) {
      case roleAuthMethods.SUPER_ADMIN:
        if (userRole === process.env.SUPER_ADMIN_ID) {
          next();
        } else {
          res.status(401);
          return res.send("Method implemented incorrectly");
        }
        break;
      case roleAuthMethods.ADMIN:
        if (
          userRole === process.env.SUPER_ADMIN_ID ||
          userRole === process.env.ADMIN_ID
        ) {
          next();
        } else {
          res.status(401);
          return res.send("Method implemented incorrectly");
        }
        break;
      case roleAuthMethods.MATCH_AND_APPLY:
        if (
          userRole === process.env.SUPER_ADMIN_ID ||
          userRole === process.env.ADMIN_ID
        ) {
          next();
        } else {
          Role.findById(userRole, (err, role) => {
            if (err) {
              return res.status(401).json({ success: false, error: err });
            }
            const subForumAccess = role.subForumAccess;
            if (subForumAccess.indexOf(req.body.subForumID) >= 0) {
              next();
            } else {
              return res.status(401).json({ success: false, error: err });
            }
          });
        }
        break;
      case roleAuthMethods.GET_ROLES:
        if (userRole === process.env.SUPER_ADMIN_ID) {
          res.locals.authClearance = true;
          next();
        } else if (userRole === process.env.ADMIN_ID) {
          res.locals.authClearance = false;
          next();
        } else {
          return res.status(401).json({ success: false, error: "failed" });
        }
        break;
      default:
        res.status(501);
        return res.send("Method implemented incorrectly");
    }
  };
};
