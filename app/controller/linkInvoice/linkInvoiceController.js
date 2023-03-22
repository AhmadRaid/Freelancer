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

    const request = await Request.create({
      userId,
      requestType: "Create Invoice Link",
      linkInvoiceId: Link_Invoice._id,
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
  const {
    locationBank,
    nameAccount,
    branch,
    accountNumber,
    Currency,
    ledger,
    bankId,
    userId,
  } = data;
  try {
    let verificationExist = await verification_code.findOne({
      userId,
      verificationCode: code,
      phone,
    });

    if (!verificationExist) {
      return { code: 1, message: "Error validation message" };
    }

    const bank = await Bank.findOne({
      _id: bankId,
      userId,
    });

    if (!bank) {
      return { code: 1, message: "category.notFoundBank", data: null };
    }

    bank.locationBank = locationBank;
    bank.nameAccount = nameAccount;
    bank.branch = branch;
    bank.accountNumber = accountNumber;
    bank.Currency = Currency;
    bank.ledger = ledger;

    await bank.save();

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

module.exports.checkAdminRole = async (data) => {
  const { status , invoiceLinkId } = data;
  try {
    const Invoice_Link = await linkInvoice.findOne({
      _id: invoiceLinkId
    });

    if (!Invoice_Link) {
      return { code: 1, message: "category.notFoundBank", data: null };
    }

    Invoice_Link.status = status;
    await Invoice_Link.save();

    return { code: 0, message: "commonSuccess.message", data: bank };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
