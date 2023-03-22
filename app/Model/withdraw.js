const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["Cash", "Bank"],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Sent", "Completed", "Ready", "Canceled"],
      default: "Pending",
    },
    officeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Office",
      required: function () {
        return this.method === "Cash";
      },
    },
    RecipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipient",
      required: function () {
        return this.method === "Cash";
      },
    },
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
      required: function () {
        return this.method === "Bank";
      },
    },
    historyStatus: {
      type: Array,
      status: { type: String },
      Date: { type: Date },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const withdraw = mongoose.model("withdraw", withdrawSchema);
module.exports = withdraw;
