const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (like index.html) from the root directory
app.use(express.static(path.join(__dirname)));

// GET /api/portfolio -> List all records
app.get('/api/portfolio', (req, res) => {
    const query = 'SELECT * FROM portfolio';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, data: rows });
    });
});

// GET /api/portfolio/:id -> Get one record
app.get('/api/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM portfolio WHERE id = ?';
    db.get(query, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ success: true, data: row });
    });
});

// POST /api/portfolio -> Create a record
app.post('/api/portfolio', (req, res) => {
    const { owner_name, project_title, description, tech_stack, live_url, year } = req.body;
    
    if (!owner_name || !project_title) {
        return res.status(400).json({ error: 'owner_name and project_title are required' });
    }

    const query = `INSERT INTO portfolio (owner_name, project_title, description, tech_stack, live_url, year) VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [owner_name, project_title, description, tech_stack, live_url, year];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            success: true,
            message: 'Record created successfully',
            data: { id: this.lastID, owner_name, project_title, description, tech_stack, live_url, year }
        });
    });
});

// PUT /api/portfolio/:id -> Update a record
app.put('/api/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const { owner_name, project_title, description, tech_stack, live_url, year } = req.body;

    const query = `UPDATE portfolio SET owner_name = ?, project_title = ?, description = ?, tech_stack = ?, live_url = ?, year = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [owner_name, project_title, description, tech_stack, live_url, year, id];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({
            success: true,
            message: 'Record updated successfully',
            data: { id, owner_name, project_title, description, tech_stack, live_url, year }
        });
    });
});

// DELETE /api/portfolio/:id -> Delete a record
app.delete('/api/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM portfolio WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.json({ success: true, message: 'Record deleted successfully', id });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

