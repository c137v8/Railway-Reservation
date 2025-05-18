require('dotenv').config();
const express   = require('express');
const path      = require('path');
//const connectDB = require('./db');
//const bookings  = require('./routes/bookings');

const app  = express();
const PORT = process.env.PORT || 5000;

// DB
//connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
//app.use('/', bookings);   // POST /book handled here

// Start
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
