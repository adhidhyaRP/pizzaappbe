import mongoose from 'mongoose';

const { Schema } = mongoose;

const drinkSchema = new Schema({
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
  }
});

const Drink = mongoose.model('Drink', drinkSchema);

export default Drink;

