import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  calories: Number
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza
