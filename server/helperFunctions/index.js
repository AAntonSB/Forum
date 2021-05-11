const { v4 } = require("uuid");

module.exports = {
  genUUID: function () {
    return v4();
  },
};
