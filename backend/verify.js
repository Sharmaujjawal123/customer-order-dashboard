const pool = require('./db/db');


async function verify() {
  const users = await pool.query('SELECT * FROM users LIMIT 5');
  const orders = await pool.query('SELECT * FROM orders LIMIT 5');

  console.log("Users:", users.rows);
  console.log("Orders:", orders.rows);
}

verify().catch(console.error);
