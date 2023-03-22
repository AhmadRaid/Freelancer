const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bankName: {
    type: String,
    required: true,
  },
  nameAccount: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  Currency: {
    type: String,
    default: "USD",
    required: true,
  },
  ledger: {
    type: String,
    required: true,
  },
  isDeleted:{
    type: Boolean,
    default: "false",
  }
});
const Bank = mongoose.model("bank", bankSchema);
module.exports = Bank;
