const authController = require("./authController.js");
const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");

module.exports.signUp = async (req, res, next) => {
  try {
    const { message, data, code } = await authController.signUp({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { message, data, code } = await authController.login({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.verification_email = async (req, res, next) => {
  try {
    const { message, data, code } = await authController.verification_email({
      ...req.body,
    });

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.verificationIdentity = async (req, res, next) => {
  try {
    const { message, data, code } = await authController.verificationIdentity(
      req,
      res,
      req.body.user_id
    );
    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.verificationAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { message, data, code } = await authController.verificationIdentity({
      ...req.body,
      ...userId,
      ...req
    });
    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};
