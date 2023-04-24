import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IAddress } from "./interfaces/user";

const addressSchema = new Schema<IAddress>({
  documentType: {
    type: String,
    enum: ["Phone Bill", "Water Bill", "Bank Statement"],
  },
  country: String,
  city: String,
  address1: String,
  address2: String,
  fileUploaded: String,
});

const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    required: true,
    default: "Client",
    enum: ["Admin_Team", "Client"],
  },
  address: addressSchema,
  phone: { type: String, required: true },
  balance: { type: Number, default: 0 },
  useCash: { type: Boolean, default: false },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.correctPassword = async function (
  this: IUser,
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const User: Model<IUser> = mongoose.model("User", userSchema);