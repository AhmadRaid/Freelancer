const mongoose = require("mongoose");
const { Request } = require("../Model");

const linkInvoice = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  invoiceId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  }],

  Currency: {
    type: String,
    default: "USD",
  },

  jobDetails: [
    {
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
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

  fees:{
    type: Number,
    default : 10
  },

  TotalPrice:{
    type: Number,
  },
  disapprovalReason: {
    type: String,
    required: function () {
      return this.status == "rejected";
    },
  },

  // isDeleted: {
  //   type: Boolean,
  //   default: "false",
  // },
});

linkInvoice.post("save", async function (doc, next) {
  try {
    if (doc.status !== "pending verification") {
      await Request.create({
        userId: doc.userId,
        requestType: "Create Invoice Link",
        linkInvoiceId: doc._id,
      });
    }

    doc.link = `http://localhost:3000/api/${doc._id}`;
    doc.save();
    next();
  } catch (err) {
    next(err);
  }
});

const Link_Invoice = mongoose.model("linkInvoice", linkInvoice);

module.exports = Link_Invoice;
