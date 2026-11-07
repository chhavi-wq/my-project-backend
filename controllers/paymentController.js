const crypto = require('crypto');
const Razorpay = require('razorpay');

exports.createPaymentOrder = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ success: false, message: 'Razorpay credentials missing' });
    }
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const { amount, currency = 'INR', receipt } = req.body;
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt || 'rcpt_' + Date.now(),
    });
    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'secret')
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');
    if (expected !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
