import { Recipient, verification_code } from "../../Model"

interface recipientData {
  userId: string,
  phone: string,
  idRecipientNumber: string,
  code : string,
  fullName : string,
  RecipientId: string,

}

 const getAllRecipient = async (userId : string) => {
  try {
    let recipients = await Recipient.find({ userId });
    if (!recipients) {
      return { code: 1, message: "We dont have recipients", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { recipients } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

 const sendCode = async (data : recipientData) => {
  const { userId, phone, idRecipientNumber } = data;
  try {

    const recipientExist = await Recipient.findOne({
      idRecipientNumber,
      isDeleted: false,
    });

    if (recipientExist) {
      return { code: 1, message: "recipient.exist use", data: { recipientExist } };
    }

    let verificationExist = await verification_code.findOne({
      userId,
      phone,
    });

    if (verificationExist) {
      return { code: 1, message: "verification Exist check your mobile" };
    }

    const verificationCode = 123456;

    await verification_code.create({
      userId,
      verificationCode,
      phone
    });

    return {
      code: 0,
      message: "Code send successful",
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

 const addRecipient = async (data : recipientData) => {
  
  const { userId, fullName, phone, idRecipientNumber, code } = data;
  try {
    let verificationExist = await verification_code.findOne({
      userId,
      verificationCode: code,
      phone,
    });

    if (!verificationExist) {
      return { code: 1, message: "Error validation message" };
    }

    let recipient = await Recipient.create({
      userId,
      fullName,
      phone,
      idRecipientNumber,
    });


    return { code: 0, message: "commonSuccess.message", data: { recipient } };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

// export const editRecipient = async (data : recipientData) => {
//   const { userId, RecipientId, fullName, phoneNumber, idRecipientNumber } =
//     data;
//   try {

//     let verificationExist = await verification_code.findOne({
//       userId,
//       verificationCode: code,
//       phone,
//     });

//     if (!verificationExist) {
//       return { code: 1, message: "Error validation message" };
//     }

//     const recipient = await Recipient.findOne({
//       _id: RecipientId,
//       userId,
//     });

//     if (!recipient) {
//       return { code: 1, message: "recipient.not found recipient", data: null };
//     }

//     recipient.fullName = fullName;
//     recipient.phoneNumber = phoneNumber;
//     recipient.idRecipientNumber = idRecipientNumber;

//     await recipient.save();

//     return { code: 0, message: "commonSuccess.message", data: recipient };
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

// export const deleteRecipient = async (data : recipientData) => {
//   const { userId, RecipientId, fullName, phoneNumber, idRecipientNumber } =
//     data;
//   try {
//     const recipient = await Recipient.findOne({
//       _id: RecipientId,
//       userId,
//     });

//     if (!recipient) {
//       return { code: 1, message: "recipient.notFoundRecipient", data: null };
//     }
//     recipient.isDeleted = true;

//     await recipient.save();

//     return { code: 0, message: "commonSuccess.message", data: recipient };
//   } catch (error: any) {
//     console.log(error);
//     throw new Error(error);
//   }
// };


const recipientController = {
  getAllRecipient,
  sendCode,
  addRecipient,
};

export default recipientController;
