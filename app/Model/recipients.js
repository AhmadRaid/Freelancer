const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    idRecipientNumber:{
        type: Number,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: "false"
    }

});
const Recipient = mongoose.model('recipient', recipientSchema);
module.exports = Recipient;
