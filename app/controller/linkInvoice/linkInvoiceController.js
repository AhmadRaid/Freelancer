const { linkInvoice, verification_user, Request } = require("../../Model");

module.exports.getAllLinkInvoice = async (userId) => {
  try {
    let Link_Invoice = await linkInvoice.find({
      status: { $ne: "archived" },
      userId,
    });
    if (!Link_Invoice) {
      return { code: 1, message: "We dont have Link Invoice", data: null };
    }
    return {
      code: 0,
      message: "commonSuccess.message",
      data: { Link_Invoice },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addLinkInvoice = async (data) => {
  let { userId, currency, jobDetails, status, link } = data;

  try {
    let verificationUser = await verification_user.findOne({ userId });

    if (!verificationUser) {
      return {
        code: 1,
        message: "verificationUser.not found",
        data: { Link_Invoice },
      };
    }

    if (verificationUser.AcceptVerificationID == false) {
      status = "pending verification";
    }

    const Link_Invoice = await linkInvoice.create({
      userId,
      currency,
      jobDetails,
      status,
      link,
    });

    return {
      code: 0,
      message: "commonSuccess.message",
      data: { Link_Invoice },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.editLinkInvoice = async (data) => {
  const { userId, invoiceLinkId, currency, jobDetails, status } = data;

  try {
    const Invoice_Link = await invoiceLink.findOne({
      _id: invoiceLinkId,
      userId,
    });

    if (!Invoice_Link) {
      return { code: 1, message: "category.notFoundBank", data: null };
    }

    if (Invoice_Link.status == "archived") {
      return {
        code: 1,
        message:
          "You cant change  because this invoice link status is archived",
        data: null,
      };
    }

    bank.currency = locationBank;
    bank.jobDetails = nameAccount;
    bank.status = branch;

    await Invoice_Link.save();

    return { code: 0, message: "commonSuccess.message", data: bank };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.deleteLinkInvoice = async (data) => {
  const { status, invoiceLinkId, disapprovalReason } = data;
  try {
    const Invoice_Link = await linkInvoice.findOne({
      _id: invoiceLinkId,
    });

    if (!Invoice_Link) {
      return {
        code: 1,
        message: "invoiceLink.notFoundInvoiceLink",
        data: null,
      };
    }

    Invoice_Link.status = "archived";

    if (disapprovalReason) {
      Invoice_Link.disapprovalReason = disapprovalReason;
    }
    await Invoice_Link.save();

    return {
      code: 0,
      message: "commonSuccess.message",
      data: { Invoice_Link },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.payLinkInvoice = async (data) => {
  const { invoiceLinkId, userId } = data;
  try {
    const invoiceLink = await linkInvoice.findOne({
      _id: invoiceLinkId,
    });
    if (!invoiceLink) {
      return {
        code: 1,
        message: "invoiceLink.notFoundInvoiceLink",
        data: null,
      };
    }

    if (invoiceLink.status == "active") {
      const invoice = await Invoice.create({
        freelancerId: userId,
        invoiceLinkId,
      });
      return { code: 0, message: "commonSuccess.message", data: invoice };
    }
    return { code: 1, message: "commonSuccess.message", data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.Admin_change_status = async (data) => {
  const { status, invoiceLinkId, disapprovalReason } = data;
  console.log(invoiceLinkId);
  try {
    const Invoice_Link = await linkInvoice.findOne({
      _id: invoiceLinkId,
    });

    if (!Invoice_Link) {
      return {
        code: 1,
        message: "invoiceLink.notFoundInvoiceLink",
        data: null,
      };
    }

    Invoice_Link.status = status;

    if (disapprovalReason) {
      Invoice_Link.disapprovalReason = disapprovalReason;
    }
    await Invoice_Link.save();

    return {
      code: 0,
      message: "commonSuccess.message",
      data: { Invoice_Link },
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.Client_change_status = async (data) => {
  const { status, invoiceLinkId } = data;
  try {
    const Invoice_Link = await linkInvoice.findOne({
      _id: invoiceLinkId,
    });
    if (!Invoice_Link) {
      return {
        code: 1,
        message: "invoiceLink.notFoundInvoiceLink",
        data: null,
      };
    }
    Invoice_Link.status = status;
    Invoice_Link.save();

    return { code: 1, message: "commonSuccess.message", data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
