const { Pool } = require('pg');

const pool = new Pool({
  user: 'achraf',
  host: 'localhost',
  database: '',
  password: '',
  port: 5432,
});

module.exports = pool;
