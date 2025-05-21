const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "your_connection_string_here"
});

module.exports = pool;
