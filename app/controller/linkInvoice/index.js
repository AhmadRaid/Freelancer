const InvoiceLinkController = require("./linkInvoiceController");
const { Success, Created } = require("../../../utils/response/success/successes");
const {
  InternalServerError,
  BadRequest,
  NotFound,
} = require("../../../utils/response/error/errors");
module.exports.getAllLinkInvoice = async (req, res, next) => {
  try {
    const { message, data, code } = await InvoiceLinkController.getAllLinkInvoice({
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
    let userId = req.user._id
    const { message, data, code } = await InvoiceLinkController.addLinkInvoice({
      userId,
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

module.exports.editLinkInvoice = async (req, res, next) => {
  try {
    let userId = req.user._id

    const { message, data, code } = await InvoiceLinkController.editLinkInvoice({
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

    const { message, data, code } = await InvoiceLinkController.deleteLinkInvoice({
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


module.exports.checkAdminRole = async (req, res, next) => {
  try {
    const { message, data, code } = await InvoiceLinkController.checkAdminRole({
      ...req.body,
      ...req.params
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


module.exports.payLinkInvoice = async (req, res, next) => {
  try {
    const { message, data, code } = await InvoiceLinkController.payLinkInvoice({
      ...req.user._id,
      ...req.params
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


module.exports.Admin_change_status = async (req, res, next) => {
  try {
    const { message, data, code } = await InvoiceLinkController.Admin_change_status({
      ...req.body,
      ...req.params
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

module.exports.Client_change_status = async (req, res, next) => {
  try {
    const { message, data, code } = await InvoiceLinkController.Client_change_status({
      ...req.body,
      ...req.params
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

