import mongoose from 'mongoose';

const bucketItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'itemType', // Dynamic reference to the model based on the itemType field
  },
  itemType: {
    type: String,
    required: true,
    enum: ['Pizza', 'ComboPack', 'Drink', 'Dessert'], // Add all possible item types
  },
  quantity: {
    type: Number,
    default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const BucketItem = mongoose.model('BucketItem', bucketItemSchema);

export default BucketItem;
