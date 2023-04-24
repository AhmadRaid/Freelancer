import { Document, Schema } from "mongoose";

export interface IRecipient extends Document {
    userId: Schema.Types.ObjectId,
    fullName: string,
    phone: number,
    idRecipientNumber: number,
    isDeleted: boolean;
}


