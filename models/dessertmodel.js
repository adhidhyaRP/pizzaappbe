import mongoose from 'mongoose';

const { Schema } = mongoose;

const dessertSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
});

const Dessert = mongoose.model('Dessert', dessertSchema);

export default Dessert;
