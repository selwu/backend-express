const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 32,
  },
  about: String,
});

module.exports = mongoose.model('user', userSchema);
