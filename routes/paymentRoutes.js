import express from 'express';
import Razorpay from 'razorpay';
import PaymentForPizza from '../models/PaymentForPizza.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order and store payment details
router.post('/payment/order', async (req, res) => {
  const { amount, userId, address, items } = req.body; // Include items

  try {
    const options = {
      amount: amount, // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_order_${Math.random().toString(36).substring(7)}`, // unique receipt id
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send('Some error occurred');
    }

    // Store payment details in the database
    const payment = new PaymentForPizza({
      userId,
      address,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'created',
      items, // Store item IDs
    });

    await payment.save();

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update payment status after successful payment
router.post('/payment/success', async (req, res) => {
  const { orderId, paymentId, status } = req.body;

  try {
    // Find the payment record in the database
    const payment = await PaymentForPizza.findOne({ orderId });

    if (!payment) {
      return res.status(404).send('Payment record not found');
    }

    // Update payment details
    payment.paymentId = paymentId;
    payment.status = status;

    await payment.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
