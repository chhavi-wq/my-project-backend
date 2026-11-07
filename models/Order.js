const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        thumbnail: { type: String },
      },
    ],
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
