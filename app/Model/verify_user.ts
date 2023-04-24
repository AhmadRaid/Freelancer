import mongoose, { Schema, Document } from "mongoose";

export interface IVerification extends Document {
  userId: mongoose.Types.ObjectId;
  verificationEmail: boolean;
  verificationID: {
    status: string;
    document_type?: "identify_Card" | "Passport" | "Driver License";
    identifyFile?: string;
  };
  AcceptVerificationID?: "Disapproval" | "Approval";
  DisapprovalReasons?: {
    reasons: "Outdated Document" | "Fraud Document";
    note?: string;
  };
  verificationMobile: boolean;
  verifiedAddress: {
    status: "not_uploaded" | "pending" | "approved" | "rejected";
    addressDocumentType?:
      | "water_bill"
      | "phone_bill"
      | "bank_statement"
      | "electricity_bill"
      | "other";
    addressFile?: string;
    otherDocumentType?: string;
    disapproveReason?: {
      reason?: string;
      note?: string;
    };
  };
}

const verificationSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationEmail: {
    type: Boolean,
    default: false,
  },
  verificationID: {
    status: {
      type: String,
      default: "Not Verified",
      enum: ["Not Verified", "Pending", "Approval", "Disapproval"],
    },
    document_type: {
      type: String,
      enum: ["identify_Card", "Passport", "Driver License"],
    },
    identifyFile: String,
  },
  AcceptVerificationID: {
    type: String,
    enum: ["Disapproval", "Approval"],
  },
  DisapprovalReasons: {
    reasons: {
      type: String,
      enum: ["Outdated Document", "Fraud Document"],
      required: true,
    },
    note: {
      type: String,
    },
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
});

export const verification_user = mongoose.model<IVerification>(
  "verification_user",
  verificationSchema
);
