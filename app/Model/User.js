const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    required: true,
    default: "Client",
    enum: ["Admin_Team", "Client"],
  },
  address: {
    documentType: {
      type: String,
      enum: ["Phone Bill", "Water Bill", "Bank Statement"],
    },
    country: {
      type: String,
  //    required: true,
    },
    city: {
      type: String,
  //    required: true,
    },
    address1: {
      type: String,
  //    required: true,
    },
    address2: {
      type: String,
  //   required: true,
    },
    fileUploaded: {
      type: String,
    //  required: true,
    },
  },
  phone: { type: String , required:true },
  balance: { type: Number , default : 0 },
  useCash: { type: Boolean , default : false },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const userMethod = mongoose.model("User", userSchema);
module.exports = userMethod;
