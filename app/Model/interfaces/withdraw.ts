import { Document, Schema } from "mongoose";


export interface IWithdraw extends Document {
    userId: Schema.Types.ObjectId;
    amount: number;
    method: "Cash" | "Bank";
    status: "Pending" | "Sent" | "Completed" | "Ready" | "Canceled";
    officeId?: Schema.Types.ObjectId;
    RecipientId?: Schema.Types.ObjectId;
    bankId?: Schema.Types.ObjectId;
    historyStatus: Array<{ status: string; Date: Date }>;
    isDeleted: boolean;
}