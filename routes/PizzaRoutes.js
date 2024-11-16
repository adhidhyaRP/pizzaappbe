import express from 'express'
import Pizza from '../models/pizzamodel.js';

const router = express.Router();

// GET all pizzas
router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router
