const { Invoice } = require('../../Model');

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
    let { client, jobDetails } = data;
    if (!Array.isArray(jobDetails)) {
      jobDetails = [jobDetails];
    }
    const invoice = await Invoice.create({});
    return { code: 0, message: 'hi', data: data };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports.getDetails = async (data, freelancerId) => {
  try {
    const {} = data;
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
