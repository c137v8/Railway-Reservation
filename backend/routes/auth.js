// routes/authRoutes.js
const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, passkey } = req.body;
  const hashedPasskey = crypto.createHash('sha256').update(passkey).digest('hex');
  const newUser = new User({ name, email, passkey: hashedPasskey });

  try {
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, passkey } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send('User not found');

  const hashedPasskey = crypto.createHash('sha256').update(passkey).digest('hex');
  if (hashedPasskey === user.passkey) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid passkey');
  }
});

module.exports = router;
