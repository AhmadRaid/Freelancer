import mongoose, { Model, Schema } from "mongoose"
import { IBank } from "./interfaces/bank";

const bankSchema: Schema<IBank> = new mongoose.Schema({
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
  isDeleted: {
    type: Boolean,
    default: false,
  }
});


export const Bank: Model<IBank> = mongoose.model("bank", bankSchema);
