import mongoose from "mongoose"


interface verificationDocument extends mongoose.Document {
  userId: string,
  verificationCode: string,
  phone: string,
}

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  verificationCode: {
    type: Number,
    required:true
  },
  phone:{
    type: Number,
    required:true
  },
  createdAt: { type: Date, expires: '2m', default: Date.now },
});

export const verification_code = mongoose.model<verificationDocument>('verification_code', verificationSchema);
