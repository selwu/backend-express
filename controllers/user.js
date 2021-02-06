const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
};

const createUser = (req, res) => {
  const { password, email } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({ password: hash, email })
      .then((user) => res.send(user))
      .catch((err) => res.status(400).send(err)),
  );
};

const login = (req, res) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Wrong login or password'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Wrong login or password'));
      }
      res.send({ message: 'Good !!!' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
};

module.exports = { createUser, updateUser, deleteUser, getUsers, login };
