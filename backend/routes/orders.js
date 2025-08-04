const express = require('express');
const router = express.Router();
const db = require('../db/db'); // adjust path based on your setup

// Get all orders for a customer
router.get('/customers/:customerId/orders', async (req, res) => {
  const { customerId } = req.params;
  try {
    const result = await db.query('SELECT * FROM orders WHERE customer_id = $1', [customerId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Customer or orders not found' });
    }
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific order details
router.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
