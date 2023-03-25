const { linkInvoice, Invoice } = require("../app/Model");
const {
  AccessDenied,
  Unauthorized,
} = require("../utils/response/error/errors");
async function checkClientRole(req, res, next) {
  let Link_Invoice = linkInvoice.findOne({ _id: req.user._id });

  let invoice = Invoice.findOne({ _id: Link_Invoice.invoiceId });

  if (!Link_Invoice) {
    return next(new Unauthorized("Sorry , Link Invoice not exist"));
  }
  
  if (!invoice) {
    return next(new Unauthorized("Sorry , Invoice not exist"));
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
    (Link_Invoice.status == "active" || Link_Invoice.status == "inactive") &&
    req.body.status == "archived" &&
    Link_Invoice.invoiceId !== null &&
    (invoice.status !== "Canceled" || invoice.status !== "archived")
  ) {
    return next(
      new AccessDenied(
        "Sorry , From active or inactive to archived, in case there are invoices associated with the link and not cancelled or archived invoice"
      )
    );
  }
}

module.exports = checkClientRole;
