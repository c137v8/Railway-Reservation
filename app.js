const express = require('express');
const app = express();
const pool = require('./config/db');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // make sure HTML/CSS are in 'public'

app.post('/book', async (req, res) => {
    const { name, source, destination, journey_date, travel_class, seats } = req.body;
    const pnr = crypto.randomBytes(4).toString('hex').toUpperCase();

    try {
        await pool.query(
            `INSERT INTO tickets (name, source, destination, journey_date, travel_class, seats, pnr)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [name, source, destination, journey_date, travel_class, seats, pnr]
        );
        res.send(`Ticket booked successfully! Your PNR is ${pnr}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Booking failed");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
