const express = require('express');
const app = express();
const pool = require('./config/db'); // PostgreSQL connection
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serves all HTML, CSS, JS

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/book', async (req, res) => {
    const { name, source, destination, journey_date, travel_class, seats } = req.body;
    const pnr = crypto.randomBytes(4).toString('hex').toUpperCase(); // generate 8-char random PNR

    try {
        await pool.query(
            `INSERT INTO tickets (name, source, destination, journey_date, travel_class, seats, pnr)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, source, destination, journey_date, travel_class, seats, pnr]
        );
        res.redirect(`/booking_result.html?success=true&pnr=${pnr}`);
    } catch (err) {
        console.error('Booking error:', err.message);
        res.redirect(`/booking_result.html?success=false`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Railway Reservation Server running on port ${PORT}`);
});
