import mongoose from 'mongoose';

const paymentForPizzaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BucketItem', // Adjust based on your actual bucket item model
  }]
});

const PaymentForPizza = mongoose.model('PaymentForPizza', paymentForPizzaSchema);

export default PaymentForPizza;
