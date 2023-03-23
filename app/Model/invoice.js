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
        title: String,
        price: Number,
        details: String,
      },
    ],
    fees: Number,
    paymentMethod: {
      enum: ['creditCard', 'paypal', 'applePay'],
    },
    status: {
      type: String,
      enum: [
        'paid',
        'sent',
        'pending',
        'pending payment',
        'canceled',
        'disapproved',
        'refunded',
      ],
      default: 'pending',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
