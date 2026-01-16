const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// In-memory storage (use database in production)
let items = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'
  },
  {
    id: '3',
    name: 'Laptop Stand Aluminum',
    description: 'Ergonomic laptop stand with adjustable height and cooling ventilation.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
  },
  {
    id: '4',
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming mechanical keyboard with customizable RGB lighting and tactile switches.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Precision wireless mouse with ergonomic design and long battery life.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop'
  },
  {
    id: '6',
    name: '4K Webcam',
    description: 'Professional 4K webcam with auto-focus and built-in microphone.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop'
  }
];

/**
 * GET /api/items
 * Get all items (public)
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    items
  });
});

/**
 * GET /api/items/:id
 * Get single item by ID (public)
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  res.json({
    success: true,
    item
  });
});

/**
 * POST /api/items
 * Create new item (protected - requires authentication)
 */
router.post('/', verifyToken, (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and price are required'
      });
    }

    // Create new item
    const newItem = {
      id: String(items.length + 1),
      name,
      description,
      price: parseFloat(price),
      image: image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      createdBy: req.user.email,
      createdAt: new Date().toISOString()
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      item: newItem
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create item'
    });
  }
});

module.exports = router;
