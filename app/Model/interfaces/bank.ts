import { Document, Schema } from "mongoose";

export interface IBank extends Document {
    userId: Schema.Types.ObjectId,
    bankName: string,
    nameAccount: string,
    branch: string,
    accountNumber: number,
    Currency: string,
    ledger: string,
    phone?:number,
    code?:number,
    isDeleted: boolean

  }