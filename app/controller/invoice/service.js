const { Invoice, verification_user } = require('../../Model');

module.exports.getListing = async (data, freelancerId) => {
  try {
    const {} = data;
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
    const invoice = await Invoice.create({
      freelancerId,
      name: fullName,
      email,
      currency,
      country,
      services,
      status,
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
module.exports.cancel = async (date, freelancerId) => {
  try {
    const {} = data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.edit = async (data, freelancerId) => {
  try {
    const {} = data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
