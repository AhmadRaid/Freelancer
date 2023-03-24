const { Invoice, verification_user } = require('../../Model');

module.exports.getListing = async (data, freelancerId) => {
  try {
    let { search, offset, limit, filters, sort } = data;
    limit = limit ? parseInt(limit) : 10;
    offset = offset ? parseInt(offset) : 0;
    if (sort && sort[0] == '-') {
      sort = { [sort.slice(1)]: -1 };
    } else if (sort) {
      sort = { [sort]: 1 };
    } else sort = { createdAt: -1 };

    const query = {
      freelancerId,
      isDeleted: false,
    };
    if (filters) {
      query.status = { $in: Array.isArray(filters) ? filters : [filters] };
    }
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: regex },
        { status: regex },
        { amount: regex },
        { 'services.title': regex },
        { 'services.description': regex },
      ];
    }

    const invoices = await Invoice.aggregate([
      {
        $match: {
          ...query,
        },
      },
      {
        $project: {
          name: 1,
          createdAt: 1,
          amount: 1,
          status: 1,
          services: {
            title: 1,
            description: 1,
          },
        },
      },
      { $sort: sort },
      { $skip: offset },
      { $limit: limit },
    ]);
    const count = await Invoice.aggregate([
      { $match: { ...query } },
      { $count: 'count' },
    ]);
    return { code: 0, message: 'get listings', data: { count, invoices } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.addInvoice = async (data, freelancerId) => {
  try {
    const { fullName, email, currency, country } = data;

    let { services } = data;
    services = Array.isArray(services) ? services : [services];

    const userVerified = await verification_user.findOne({
      userId: freelancerId,
    });

    const status = userVerified.AcceptVerificationID
      ? 'pending approval'
      : 'pending verification';
    const message = userVerified.AcceptVerificationID
      ? 'invoice created and sent to team'
      : 'invoice created need to verify id to send to team';
    let amount = 10;
    services.map((service) => {
      amount += service.price;
    });
    const invoice = await Invoice.create({
      freelancerId,
      name: fullName,
      email,
      currency,
      country,
      services,
      status,
      amount,
    });
    return {
      code: 0,
      message,
      data: invoice,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getDetails = async (invoiceId, freelancerId) => {
  try {
    const invoice = await Invoice.findOne({
      freelancerId,
      _id: invoiceId,
      isDeleted: false,
    });
    if (!invoice) {
      return { code: 1, message: "invoice doesn't exist", data: null };
    }
    return { code: 0, message: 'invoice details', data: invoice };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.delete = async (invoiceId, freelancerId) => {
  try {
    const cancelableStatus = [
      'pending verification',
      'pending approval',
      'sent',
    ];

    const invoice = await Invoice.findOne({
      freelancerId,
      _id: invoiceId,
      isDeleted: false,
    });

    if (!invoice) {
      return { code: 1, message: "invoice doesn't exist", data: null };
    }

    if (invoice.status === 'canceled') {
      invoice.status = 'archived';
      invoice.isDeleted = true;
      await invoice.save();
      return { code: 0, message: 'invoice deleted', data: null };
    }
    if (cancelableStatus.includes(invoice.status)) {
      invoice.status = 'canceled';
      await invoice.save();
      return { code: 0, message: 'invoice canceled', data: null };
    }
    return { code: 2, message: "invoice can't be canceled or deleted" };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.edit = async (data, invoiceId, freelancerId) => {
  try {
    const { fullName, email, currency, country } = data;
    let { services } = data;
    services = Array.isArray(services) ? services : [services];

    const editableStatus = ['pending verification', 'pending approval', 'sent'];
    const invoice = await Invoice.findOne({
      freelancerId,
      _id: invoiceId,
      isDeleted: false,
    });

    if (!invoice) {
      return { code: 1, message: "invoice doesn't exist", data: null };
    }

    if (!editableStatus.includes(invoice.status)) {
      return { code: 1, message: 'invoice uneditable', data: invoice };
    }

    invoice.name = fullName;
    invoice.email = email;
    invoice.currency = currency;
    invoice.country = country;
    invoice.services = services;
    await invoice.save();
    return {
      code: 0,
      message: 'invoice updated/edited successfully',
      data: invoice,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
