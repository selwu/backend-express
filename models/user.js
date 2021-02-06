const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('user', userSchema);
