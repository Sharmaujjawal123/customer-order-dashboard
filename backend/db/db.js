const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',             // Default PostgreSQL user
  host: 'localhost',            // Don't use ::1 or 127.0.0.1 explicitly
  database: 'ecommerce_db',     // Replace with your database name
  password: 'Uwala@9931',    // Your PostgreSQL password
  port: 5432,                   // Default port
});

module.exports = pool;
