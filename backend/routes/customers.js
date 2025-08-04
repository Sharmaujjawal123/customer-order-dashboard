const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // PostgreSQL connection


router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT id, name, email, created_at FROM users ORDER BY id LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    res.status(200).json({ customers: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ GET /customers/:id
router.get('/:id', async (req, res) => {
  const customerId = parseInt(req.params.id);

  if (isNaN(customerId)) {
    return res.status(400).json({ error: 'Invalid customer ID' });
  }

  try {
    const userResult = await pool.query(
      `SELECT id, name, email, created_at FROM users WHERE id = $1`,
      [customerId]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const orderCountResult = await pool.query(
      `SELECT COUNT(*) FROM orders WHERE user_id = $1`,
      [customerId]
    );

    const customer = userResult.rows[0];
    customer.order_count = parseInt(orderCountResult.rows[0].count);

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
