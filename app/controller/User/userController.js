const { User, verification_user } = require("../../Model");
const bcrypt = require("bcrypt");

module.exports.getAllUser = async (data) => {
  try {
    let user = await User.find({});
    if (!user) {
      return { code: 1, message: "We dont have User", data: null };
    }
    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.addUser = async (data) => {
  const { name, email, phone, password, role } = data;
  try {
    //  const salt = await bcrypt.genSalt();
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    await verification_user.create({
      userId: user._id,
    });

    return { code: 0, message: "commonSuccess.message", data: { user } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.viewUserDetails = async (data) => {
  const { name, email, phone, password } = data;
  try {
    const user = await User.findOne({
      name,
      email,
      phone,
    }).select("-__v");

    if (!user) {
      return { code: 1, message: "category.notFoundUser", data: null };
    }

    return { code: 0, message: "commonSuccess.message", data: user };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.verifyAddress = async (data) => {
  const { documentType, country, city, address1, address2, req } = data;
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });

    if (!user) {
      return { code: 1, message: "user.notFoundUser", data: null };
    }

    let Address = {
      documentType,
      country,
      city,
      address1,
      address2,
      fileUploaded: req.file.filename,
    };

    user.address = Address;

    await user.save();

    return { code: 0, message: "commonSuccess.message", data: user };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports.givePermissionCache = async (userId) => {
  try {
    let user = await User.find({ _id:userId });
    if (!user) {
      return {
        code: 1,
        message: "This user is not exists",
        data: null,
      };
    }

    user.useCash = "True";
    await user.save();

    return { code: 0, message: "commonSuccess.message", data: { withdraw } };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
