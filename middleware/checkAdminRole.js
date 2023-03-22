const { User } = require("../app/Model");
const {
  AccessDenied,
  Unauthorized,
} = require("../utils/response/error/errors");
async function checkAdminRole(req, res, next) {
  let user = User.findOne({ _id: req.user._id });
  if (!user) {
    return next(new Unauthorized("Sorry , This not you permission"));
  }

  if (user.role == "Admin_Team") {
    return next();
  }

  return next(new AccessDenied("Sorry , This not you permission"));
}

module.exports = checkAdminRole;
