import express from 'express';
import Dessert from '../models/dessertmodel.js';

const router = express.Router();

// GET all desserts
router.get('/desserts', async (req, res) => {
  try {
    const desserts = await Dessert.find();
    res.json(desserts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific dessert by ID
router.get('/desserts/:id', async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);
    if (!dessert) return res.status(404).json({ message: 'Dessert not found' });
    res.json(dessert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
