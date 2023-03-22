const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  verificationEmail: {
    type: Boolean,
    default: false,
  },

  verificationID: {
    document_type: {
      type: String,
      enum: ["identify_Card", "Passport", "Driver License"],
    },
    identifyFile: String,
    default: false,
  },

  verificationMobile: {
    type: Boolean,
    default: false,
  },

  verifiedAddress: {
    status: {
      type: String,
      default: "not_uploaded",
      enum: ["not_uploaded", "pending", "approved", "rejected"],
    },
    addressDocumentType: {
      type: String,
      enum: [
        "water_bill",
        "phone_bill",
        "bank_statement",
        "electricity_bill",
        "other",
      ],
    },
    addressFile: {
      type: String,
      trim: true,
    },
    otherDocumentType: {
      type: String,
      trim: true,
    },
    disapproveReason: {
      reason: { type: String },
      note: { type: String },
    },
  },

  AcceptVerificationID:{
    type: Boolean,
    default: false
  }
});
const Verification = mongoose.model("verification_user", verificationSchema);
module.exports = Verification;
