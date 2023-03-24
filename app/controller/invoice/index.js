const {
  InternalServerError,
  BadRequest,
} = require('../../../utils/response/error/errors');
const {
  Success,
  Created,
} = require('../../../utils/response/success/successes');
const service = require('./service');

module.exports.getListing = async (req, res, next) => {
  try {
    const { code, message, data } = await service.getListing(
      req.query,
      req.user._id
    );
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
    const { code, message, data } = await service.getDetails(
      req.params.id,
      req.user._id
    );
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
    const { code, message, data } = await service.addInvoice(
      req.body,
      req.user._id
    );
    if (code === 0) {
      return next(new Created(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.edit = async (req, res, next) => {
  try {
    const { code, message, data } = await service.edit(
      req.body,
      req.params.id,
      req.user._id
    );
    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
module.exports.delete = async (req, res, next) => {
  try {
    const { code, message, data } = await service.delete(
      req.params.id,
      req.user._id
    );

    if (code === 0) {
      return next(new Success(message, data));
    }
    return next(new BadRequest(message));
  } catch (error) {
    return next(new InternalServerError(error));
  }
};
