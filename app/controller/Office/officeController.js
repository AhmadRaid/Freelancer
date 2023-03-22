const { Office } = require("../../Model");

module.exports.getAllOffice = async () => {
  try {
    let office = await Office.find({ isDeleted: "false" });
    if (!office) {
      return { code: 1, message: "We dont have office", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { office } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addOffice = async (data) => {
  const { name, address, timeWork, fees } = data;
  try {
    const office = await Office.create({
      name,
      address,
      timeWork,
      fees,
    });

    return { code: 0, message: "commonSuccess.message", data: { office } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
