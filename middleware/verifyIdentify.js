const { verification_user } = require("../app/Model");
const { AccessDenied } = require("../utils/response/error/errors");
async function verifyIdentity(req, res, next) {
    let verificationUser = verification_user.findOne({ _id: req.user._id });

    if (verificationUser.AcceptVerificationID == "True") {
      return next();
    }

    return next(new AccessDenied("Sorry , You must verify identify firstly"));
  };

module.exports = verifyIdentity;
