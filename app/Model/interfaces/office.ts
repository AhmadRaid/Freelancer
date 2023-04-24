import { Document } from "mongoose";

export interface IOffice extends Document {
    name: string,
    address: string,
    timeWork: string,
    fees: string,
    isDeleted: boolean;
}