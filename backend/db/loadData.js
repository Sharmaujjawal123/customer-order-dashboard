const fs = require('fs');
const csv = require('csv-parser');
const pool = require('./db');

async function loadCSV(filePath, tableName) {
  const data = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', async () => {
        try {
          for (const row of data) {
            if (tableName === 'users') {
              await pool.query(
                `INSERT INTO users (name, email, created_at) VALUES ($1, $2, $3)`,
                [row.name, row.email, row.created_at]
              );
            } else if (tableName === 'orders') {
              await pool.query(
                `INSERT INTO orders (user_id, product_name, price, order_date) VALUES ($1, $2, $3, $4)`,
                [row.user_id, row.product_name, row.price, row.order_date]
              );
            }
          }
          console.log(`Data loaded into ${tableName}`);
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', reject);
  });
}

// Load users first, then orders
async function main() {
  try {
    await loadCSV('../data/users.csv', 'users');
    await loadCSV('../data/orders.csv', 'orders');
    process.exit(0);
  } catch (err) {
    console.error('Error loading data:', err);
    process.exit(1);
  }
}

main();
