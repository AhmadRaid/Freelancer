const { linkInvoice, verification_user, Request } = require("../../Model");

module.exports.getAllLinkInvoice = async (userId) => {
  try {
    let Link_Invoice = await linkInvoice.find({ isDeleted: false });
    if (!Link_Invoice) {
      return { code: 1, message: "We dont have Bank", data: null };
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
  const { userId, currency, jobDetails, status } = data;

  try {
    let verificationUser = verification_user.findOne({ userId });

    if (verificationUser.AcceptVerificationID == "False") {
      status = "pending verification";
    }

    const Link_Invoice = await linkInvoice.create({
      userId,
      currency,
      jobDetails,
      status,
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
  const { bankId, userId } = data;
  try {
    const bank = await Bank.findOne({
      _id: bankId,
      userId,
    });

    if (!bank) {
      return { code: 1, message: "Bank.notFoundBank", data: null };
    }

    bank.deleteOne({
      _id: bankId,
      userId,
    });

    return { code: 0, message: "commonSuccess.message", data: bank };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.payLinkInvoice = async (data) => {
  const { invoiceLinkId , userId} = data;
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
        freelancerId : userId,
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
