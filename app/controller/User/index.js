const userController = require("./userController.js");
const { Success, Created } = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllUser = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.getAllUser({
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

module.exports.addUser = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.addUser({
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

module.exports.editUser = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.editUser({
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

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.deleteUser({
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

module.exports.verifyAddress = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.verifyAddress({
     ...req.body,
      req
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

module.exports.givePermissionCache = async (req, res, next) => {
  try {
    const { message, data, code } = await userController.givePermissionCache(
      req.body.userId
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

