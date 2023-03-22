const mongoose = require("mongoose");

const linkInvoice = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Currency:{
    type : String,
    default: "USD",
  },
  jobDetails: [{
    title: {
      type: String,
      required: true,
    },
    Amount: {
      type: Number,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
}],
status:{
  type: String,
  enum:["pending verification" , "pending approval" , "active" , "rejected" , "inactive" , "archived"],
  default: "pending approval"
},
  isDeleted: {
    type: Boolean,
    default: "false",
  },
});
const Link_Invoice = mongoose.model("linkInvoice", linkInvoice);
module.exports = Link_Invoice;
