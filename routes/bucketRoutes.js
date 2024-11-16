import express from 'express';
import BucketItem from '../models/bucketItemModel.js';
import Pizza from '../models/pizzamodel.js';
import ComboPack from '../models/combomodel.js';
import Drink from '../models/drinksmodel.js';
import Dessert from '../models/dessertmodel.js';

const router = express.Router();

// Add an item to the bucket
router.post('/bucket', async (req, res) => {
  try {
    const { itemId, itemType, userId } = req.body;
    let itemModel;

    switch (itemType) {
      case 'Pizza':
        itemModel = Pizza;
        break;
      case 'ComboPack':
        itemModel = ComboPack;
        break;
      case 'Drink':
        itemModel = Drink;
        break;
      case 'Dessert':
        itemModel = Dessert;
        break;
      default:
        return res.status(400).json({ message: 'Invalid item type' });
    }

    const item = await itemModel.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const existingItem = await BucketItem.findOne({ item: itemId, user: userId, itemType });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
    } else {
      const newItem = new BucketItem({
        item: itemId,
        itemType,
        user: userId,
      });
      await newItem.save();
    }

    res.status(201).json({ message: 'Item added to bucket' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all items in the bucket for a user
router.get('/bucket/:userId', async (req, res) => {
  try {
    const bucketItems = await BucketItem.find({ user: req.params.userId })
      .populate('item');
    res.json(bucketItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Remove an item from the bucket
router.delete('/bucket/:userId/:itemId', async (req, res) => {
    try {
      const { userId, itemId } = req.params;
  
      const item = await BucketItem.findOneAndDelete({ _id: itemId, user: userId });
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found in the bucket' });
      }
  
      res.status(200).json({ message: 'Item removed from bucket' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/bucket/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const result = await BucketItem.find()
      console.log('req given')
      console.log(result)
      await BucketItem.deleteMany({ user: userId });
      
      res.status(200).json({ message: 'Bucket cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error clearing the bucket', error });
    }
  });

 

export default router;
