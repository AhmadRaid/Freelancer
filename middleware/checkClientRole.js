const { linkInvoice } = require("../app/Model");
const {
  AccessDenied,
  Unauthorized,
} = require("../utils/response/error/errors");
async function checkClientRole(req, res, next) {
  let Link_Invoice = linkInvoice.findOne({ _id: req.user._id });
  
  if (!Link_Invoice) {
    return next(new Unauthorized("Sorry , This Link Invoice not exist"));
  }


  if (
    (Link_Invoice.status == "pending approval" ||
      Link_Invoice.status == "pending verification") &&
    req.body.status == "active"
  ) {
    return next(
      new AccessDenied(
        "Sorry , You cant change the status form pending approval or pending verification to active"
      )
    );
  }

  if (
    (Link_Invoice.status == "active" ||
      Link_Invoice.status == "inactive") &&
    req.body.status == "archived" && Link_Invoice.invoiceId !== null
  ) {
    return next(
      new AccessDenied(
        "Sorry , You cant change the status form pending approval or pending verification to active"
      )
    );
  }

  return next(new AccessDenied("Sorry , This not you permission"));
}

module.exports = checkClientRole;
