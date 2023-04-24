const { linkInvoice, verification_user, Invoice } = require("../../Model");

module.exports.getAllLinkInvoice = async (data, userId) => {
  try {
    let { search, offset, limit, filters, sort } = data;

    limit = limit ? parseInt(limit) : 10;
    offset = offset ? parseInt(offset) : 0;
    if (sort && sort[0] == "-") {
      sort = { [sort.slice(1)]: -1 };
    } else if (sort) {
      sort = { [sort]: 1 };
    } else sort = { createdAt: -1 };

    const query = { userId, status: { $ne: "archived" } };

    if (filters) {
      query.status = { $in: Array.isArray(filters) ? filters : [filters] };
    }
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { status: regex },
        { amount: regex },
        { "jobDetails.title": regex },
        { "jobDetails.Description": regex },
      ];
    }

    const Link_Invoice = await linkInvoice.aggregate([
      {
        $match: {
          ...query,
        },
      },
      { $sort: sort },
      { $skip: offset },
      { $limit: limit },
    ]);
    const count = await linkInvoice.aggregate([
      { $match: { ...query } },
      { $count: "count" },
    ]);
    if (!Link_Invoice) {
      return { code: 1, message: "We dont have Link Invoice", data: null };
    }
    return {
      code: 0,
      message: "commonSuccess.message",
      data: { count, Link_Invoice },
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

    let amount = 10;
    jobDetails.map((Job_Details) => {
      amount += parseFloat(Job_Details.price);
    });

    if (verificationUser.AcceptVerificationID == false) {
      status = "pending verification";
    }

    const Link_Invoice = await linkInvoice.create({
      userId,
      currency,
      jobDetails,
      status,
      link,
      TotalPrice: parseFloat(amount),
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

    if (Invoice_Link.status == "active") {
      
      const invoice = await Invoice.create({
        freelancerId : userId,
        Currency: linkInvoice.Currency,
        services: linkInvoice.jobDetails,
      });

     Invoice_Link.invoiceId = Invoice_Link.invoiceId.push(invoice._id);

      await Invoice_Link.save();

      return { code: 0, message: "commonSuccess.message", data: invoice };
    }

    return { code: 1, message: "something error in invoice link", data: null };
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

    Invoice_Link.historyStatus = Invoice_Link.historyStatus.push({
      status,
      Date: new Date(),
    });

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

    Invoice_Link.historyStatus = Invoice_Link.historyStatus.push({
      status,
      Date: new Date(),
    });

    Invoice_Link.save();

    return { code: 1, message: "commonSuccess.message", data: null };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
