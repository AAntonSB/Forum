const { v4 } = require("uuid");

module.exports = {
  genUUID: function () {
    return v4();
  },
  roleAuthMethods: {
    SUPER_ADMIN: "superadmin",
    ADMIN: "admin",
    MATCH: "match",
    MATCH_AND_APPLY: "matchAndApply",
    GET_ROLES: "getroles",
  },
};
