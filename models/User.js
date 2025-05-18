const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
  credentialID: String,
  publicKey: String,
  counter: Number,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  credentials: [CredentialSchema],
});

module.exports = mongoose.model('User', UserSchema);
