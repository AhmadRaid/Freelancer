const { Office } = require("../../Model");
import { IOffice } from "../../Model/interfaces/office"

const getAllOffice = async () => {
  try {
    let office = await Office.find({ isDeleted: "false" });
    if (!office) {
      return { code: 1, message: "We dont have office", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { office } };
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};

const addOffice = async (data : IOffice) => {
  const { name, address, timeWork, fees } = data;
  try {
    const office = await Office.create({
      name,
      address,
      timeWork,
      fees,
    });

    return { code: 0, message: "commonSuccess.message", data: { office } };
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};

const officeController = {
  getAllOffice,
  addOffice
}

export default officeController
