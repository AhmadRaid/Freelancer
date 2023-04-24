import mongoose, {Schema , Document , Model} from "mongoose";

import { IOffice } from "./interfaces/office"

const officeSchema : Schema<IOffice> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: { 
    type: String,
    required: true,
  },
  timeWork: {
    type: String,
    required: true,
  },
  fees: {
    type: String,
    required: true,
  },
  isDeleted:{
    type: Boolean,
    default: false,
  }

});


export const office:Model<IOffice> = mongoose.model("Office", officeSchema);
