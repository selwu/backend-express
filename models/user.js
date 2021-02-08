const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  diskSpace: {
    type: Number,
    default: 1024 ** 3 * 10,
  },
  usedSpace: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'file' }],
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error('Wrong login or password'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Wrong login or password'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
