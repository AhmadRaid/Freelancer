import mongoose, { Document, Schema, Model } from "mongoose";

import { IWithdraw } from "./interfaces/withdraw"

const withdrawSchema = new Schema<IWithdraw>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "Office",
      required: function (this: IWithdraw): boolean {
        return this.method === "Cash";
      },
    },

    RecipientId: {
      type: Schema.Types.ObjectId,
      ref: "recipient",
      required: function (this: IWithdraw) {
        return this.method === "Cash";
      },
    },

    bankId: {
      type: Schema.Types.ObjectId,
      ref: "bank",
      required: function (this: IWithdraw) {
        return this.method === "Bank";
      },
    },
    
    historyStatus: [{
      status: { type: String },
      Date: { type: Date },
    }],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Withdraw: Model<IWithdraw> = mongoose.model("withdraw", withdrawSchema);