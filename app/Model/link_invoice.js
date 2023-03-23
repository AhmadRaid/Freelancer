const mongoose = require("mongoose");
const { Request } = require("../Model");

const linkInvoice = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  invoiceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },

  Currency: {
    type: String,
    default: "USD",
  },

  jobDetails: [
    {
      title: {
        type: String,
      },
      Amount: {
        type: Number,
      },
      Description: {
        type: String,
        required: true,
      },
    },
  ],

  status: {
    type: String,
    enum: [
      "pending verification",
      "pending approval",
      "active",
      "rejected",
      "inactive",
      "archived",
    ],
    default: "pending approval",
  },

  link: {
    type: String,
    required: true,
  },

  disapprovalReason: {
    type: String,
    required: function () {
      return this.status == "rejected";
    },
  },

  isDeleted: {
    type: Boolean,
    default: "false",
  },
});

linkInvoice.post("save", async function (doc, next) {
  try {
    if (doc.status !== "pending verification") {
      await Request.create({
        userId,
        requestType: "Create Invoice Link",
        linkInvoiceId: doc._id,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
});

const Link_Invoice = mongoose.model("linkInvoice", linkInvoice);

module.exports = Link_Invoice;
