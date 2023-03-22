const mongoose = require('mongoose');

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
const Verification = mongoose.model('verification_code', verificationSchema);
module.exports = Verification;
