import express from 'express';
import Drink from '../models/drinksmodel.js';
// import Drink from '../models/drinksmodel.js';

const router = express.Router();

// GET all drinks
router.get('/drinks', async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific drink by ID
router.get('/drinks/:id', async (req, res) => {
  try {
    const drink = await Drink.findById(req.params.id);
    if (!drink) return res.status(404).json({ message: 'Drink not found' });
    res.json(drink);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
