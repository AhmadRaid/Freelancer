const officeController = require("./officeController.js");
const {
  Success,
  Created,
} = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllOffice = async (req, res, next) => {
  try {

    const { message, data, code } = await officeController.getAllOffice();

    if (code === 0) {
      return next(new Success(message, data));
    }

    return next(new BadRequest(message));
  } catch (err) {
    console.log(err);
    return next(new InternalServerError(req));
  }
};

module.exports.addOffice = async (req, res, next) => {
  try {

    const { message, data, code } = await officeController.addOffice({
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

