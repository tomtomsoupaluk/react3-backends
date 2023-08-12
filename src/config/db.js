const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    // host: 'localhost',
    host: '45.77.37.85',
    user: 'wannabedev',
    password: '12345678',
    database: 'wbd_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = db;