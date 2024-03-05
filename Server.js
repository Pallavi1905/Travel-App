const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername',
    password: 'yourPassword',
    database: 'travel_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Basic user registration endpoint
app.post('/register', async (req, res) => {
    let { username, password, email } = req.body;
    password = await bcrypt.hash(password, 8);

    const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
    db.query(query, [username, password, email], (err, result) => {
        if (err) res.status(500).send("Error registering the user");
        res.status(201).send("User registered successfully");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
