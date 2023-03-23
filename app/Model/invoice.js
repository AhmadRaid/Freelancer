const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema(
  {
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      name: { type: String },
      email: { type: String },
      currency: { type: String, default: 'USD' },
      country: String,
    },
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
    fees: Number,
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
      ],
      default: 'pending approval',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('invoice', invoiceSchema);
