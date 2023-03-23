const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/response/error/errors');
const { Success } = require('../../../utils/response/success/successes');
const service = require('./service');

module.exports.getListing = async (req, res, next) => {
  try {
    const { code, message, data } = await service.getListing();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.getDetails = async (req, res, next) => {
  try {
    const { code, message, data } = await service.getDetails();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.addInvoice = async (req, res, next) => {
  try {
    const { code, message, data } = await service.addInvoice();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.edit = async (req, res, next) => {
  try {
    const { code, message, data } = await service.edit();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.cancel = async (req, res, next) => {
  try {
    const { code, message, data } = await service.cancel();
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
