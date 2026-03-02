const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true // No two users can have the same email
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);