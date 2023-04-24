import mongoose, { Schema, Document, Model } from "mongoose";
import { IRecipient } from "./interfaces/recipients"

const recipientSchema : Schema<IRecipient> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    idRecipientNumber: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});
export const Recipient:Model <IRecipient> = mongoose.model('recipient', recipientSchema);
