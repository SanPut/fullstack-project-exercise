const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Create an in-memory SQLite database
const db = new sqlite3.Database(':memory:');

// Create a table and insert data
db.serialize(() => {
    db.run('CREATE TABLE locations (id INTEGER PRIMARY KEY, name TEXT)');
    db.run('INSERT INTO locations (name) VALUES (?)', ['Tampere']);
    db.run('INSERT INTO locations (name) VALUES (?)', ['Helsinki']);
});

// Define a route to get locations
app.get('/api/locations', (req, res) => {
    db.all('SELECT * FROM locations', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ locations: rows });
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});