const { Unauthorized } = require("../utils/response/error/errors");
const { verifyAccessToken } = require("../utils/jwt");
const { User } = require("../app/Model");
async function isAuth(req, res, next) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    return next(new Unauthorized("Unauthorized"));
  }

  if (!authorization.startsWith("Bearer")) {
    return next(new Unauthorized("Unauthorized"));
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = verifyAccessToken(token);
    if (!decodedToken) {
      return next(new Unauthorized("Unauthorized"));
    }
    console.log(decodedToken);

    const user = await User.findOne({ _id: decodedToken.data.id });
    if (!user) {
      return next(new Unauthorized("Unauthorized"));
    }

    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return next(new Unauthorized("Unauthorized"));
  }
}

module.exports = isAuth;
