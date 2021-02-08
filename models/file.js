const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
});

module.exports = mongoose.model('file', todoSchema);
