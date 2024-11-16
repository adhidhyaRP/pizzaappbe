import mongoose from 'mongoose';

const { Schema } = mongoose;

const comboPackSchema = new Schema({
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

const ComboPack = mongoose.model('ComboPack', comboPackSchema);

export default ComboPack;

