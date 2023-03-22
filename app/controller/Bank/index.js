const bankController = require("./bankController.js");
const { Success, Created } = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllBank = async (req, res, next) => {
  try {
    const { message, data, code } = await bankController.getAllBank({
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

module.exports.addBank = async (req, res, next) => {
  try {
    const { message, data, code } = await bankController.addBank({
      ...req.body,
      userId:req.user._id
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

module.exports.editBank = async (req, res, next) => {
  try {
    let userId = req.user._id

    const { message, data, code } = await bankController.editBank({
      ...req.params,
      ...userId      
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

module.exports.deleteBank = async (req, res, next) => {
  try {
    let userId = req.user._id

    const { message, data, code } = await bankController.deleteBank({
      ...req.params,
      ...userId
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
    console.log("dasdas")
    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};
