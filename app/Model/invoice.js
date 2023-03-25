const mongoose = require('mongoose');
const Request = require('./request');
const invoiceSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    name: { type: String },
    email: { type: String },
    currency: { type: String, default: 'USD' },
    country: String,

    services: [
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    fees: {
      type: Number,
      default: 10,
    },
    amount: Number,
    paymentMethod: {
      enum: ['creditCard', 'paypal', 'applePay'],
    },
    status: {
      type: String,
      enum: [
        'pending verification',
        'pending approval',
        'sent',
        'rejected',
        'unpaid',
        'paid',
        'pending payment',
        'refunded',
        'archived',
        'canceled',
      ],
      default: 'pending approval',
    },
    disapprovalReason: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// TODO:add hook to add request after save
invoiceSchema.post('save', async (invoice) => {
  if (invoice.status !== 'pending verification') {
    await Request.create({
      userId: invoice.freelancerId,
      invoiceId: invoice._id,
      requestType: 'approve invoice',
    });
  }
});
module.exports = mongoose.model('invoice', invoiceSchema);
