const withdrawController = require("./withdrawController.js");
const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllWithdraw = async (req, res, next) => {
  try {
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.getAllWithdraw({
      ...req.query,
      userId
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

module.exports.addWithdraw = async (req, res, next) => {
  try {
    let userId = req.user._id
    const { message, data, code } = await withdrawController.addWithdraw({
      ...req.body,
      userId
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


module.exports.getWithdrawDetails = async (req, res, next) => {
  try {
    let WithdrawId = req.params.withdrawId;
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.getWithdrawDetails(
      WithdrawId,
      userId
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

module.exports.changeWithdrawStatus = async (req, res, next) => {
  try {
    let WithdrawId = req.params.withdrawId;
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.changeWithdrawStatus(
      WithdrawId,
      userId,
      req.body.status
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

module.exports.changeWithdrawStatus = async (req, res, next) => {
  try {
    let WithdrawId = req.params.withdrawId;
    let userId = req.user._id;
    const { message, data, code } = await withdrawController.changeWithdrawStatus(
      WithdrawId,
      userId,
      req.body.status
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



