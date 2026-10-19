const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = path.resolve(__dirname, process.env.DB_FILE || 'portfolio.db');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schemaSql, (err) => {
            if (err) {
                console.error('Error executing schema script', err.message);
            } else {
                console.log('Database tables and sample data verified.');
            }
        });
    }
});

module.exports = db;
