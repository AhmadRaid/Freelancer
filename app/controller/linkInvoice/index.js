const bankController = require("./linkInvoiceController");
const { Success, Created } = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllLinkInvoice = async (req, res, next) => {
  try {
    const { message, data, code } = await bankController.getAllLinkInvoice({
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


module.exports.addLinkInvoice = async (req, res, next) => {
  try {
    const { message, data, code } = await bankController.addLinkInvoice({
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

module.exports.editLinkInvoice = async (req, res, next) => {
  try {
    let userId = req.user._id

    const { message, data, code } = await bankController.editLinkInvoice({
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

module.exports.deleteLinkInvoice = async (req, res, next) => {
  try {
    let userId = req.user._id

    const { message, data, code } = await bankController.deleteLinkInvoice({
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
