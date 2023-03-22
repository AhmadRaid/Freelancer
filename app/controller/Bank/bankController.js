const { Bank , verification_code} = require("../../Model");

module.exports.getAllBank = async (userId) => {
  try {
    let bank = await Bank.find({_id : userId});
    if (!bank) {
      return { code: 1, message: "We dont have Bank", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { bank } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.sendCode = async (data) => {
  const {
    userId,
    bankName,
    nameAccount,
    branch,
    accountNumber,
    Currency,
    ledger,
  } = data;
    try {

    const bankExist = await Bank.findOne({
      accountNumber,
      isDeleted: false,
    });

    if (bankExist) {
      return { code: 1, message: "bank.exist use" , data : { bankExist }};
    }

    let verificationExist = await verification_code.findOne({
      userId,
      phone,
    });

    if (verificationExist) {
      return { code: 1, message: "verification Exist check your mobile" };
    }

    const verificationCode = 123456 ;

    await verification_code.create({
      userId,
      verificationCode,
      phone
    });

    return {
      code: 0,
      message: "Code send successful",
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addBank = async (data) => {
  const {
    userId,
    bankName,
    nameAccount,
    branch,
    accountNumber,
    Currency,
    ledger,
    phone,
    code
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

    const bank = await Bank.create({
      userId,
      bankName,
      nameAccount,
      branch,
      accountNumber,
      Currency,
      ledger,
    });

    return { code: 0, message: "commonSuccess.message", data: { bank } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.editBank = async (data) => {
  const { locationBank, nameAccount, branch, accountNumber, Currency, ledger , bankId , userId } =
    data;
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
      _id : bankId , userId
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

module.exports.deleteBank = async (data) => {
  const { bankId , userId } =
    data;
  try {
    const bank = await Bank.findOne({
   _id:bankId , userId 
    });

    if (!bank) {
      return { code: 1, message: "Bank.notFoundBank", data: null };
    }

    bank.deleteOne({
      _id:bankId , userId 

    });

    return { code: 0, message: "commonSuccess.message", data: bank };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
