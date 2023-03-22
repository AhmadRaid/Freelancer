const recipientController = require("./recipientController.js");
const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllRecipient = async (req, res, next) => {
  try {
    let userId = req.user._id;

    const { message, data, code } = await recipientController.getAllRecipient(userId);

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.addRecipient = async (req, res, next) => {
  try {
    let userId = req.user._id;

    const { message, data, code } = await recipientController.addRecipient({
      ...req.body,
      userId,
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

module.exports.editRecipient = async (req, res, next) => {
  try {
    let userId = req.user._id;

    const { message, data, code } = await recipientController.editRecipient({
      ...req.params,
      ...userId,
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

module.exports.deleteRecipient = async (req, res, next) => {
  try {
    let userId = req.user._id;

    const { message, data, code } = await recipientController.deleteRecipient({
      ...req.params,
      ...userId,
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


module.exports.sendCode = async (req, res, next) => {
  try {
    let userId = req.user._id;
    let phone = req.user.phone

    const { message, data, code } = await recipientController.sendCode({
      ...req.body,
      userId,
      phone
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
