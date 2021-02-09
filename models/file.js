const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accesLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  childs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

module.exports = mongoose.model('File', todoSchema);
