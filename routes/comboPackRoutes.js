import express from 'express';
import ComboPack from '../models/combomodel.js';

const router = express.Router();

// GET all combo packs
router.get('/combopacks', async (req, res) => {
  try {
    const comboPacks = await ComboPack.find();
    res.json(comboPacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific combo pack by ID
router.get('/combopacks/:id', async (req, res) => {
  try {
    const comboPack = await ComboPack.findById(req.params.id);
    if (!comboPack) return res.status(404).json({ message: 'Combo pack not found' });
    res.json(comboPack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
