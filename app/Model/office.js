const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  timeWork: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  isDeleted:{
    type: Boolean,
    default: "false",
  }
});
const office = mongoose.model("Office", officeSchema);
module.exports = office;
