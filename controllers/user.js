const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const registration = async (req, res) => {
  try {
    const { password, email } = req.body;
    const credential = await User.findOne({ email });
    if (credential) {
      return res.status(400).send({ message: 'User exist' });
    }
    const userHash = await bcrypt.hash(password, 5);
    const user = await User.create({ password: userHash, email });
    res.send({ message: 'user was created' });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: '2d',
    });
    res.send({ 
      token, 
      email: user.email,
      diskSpace: user.diskSpace,
      avatar: user.avatar,
      usedSpace: user.usedSpace,
      id: user._id,
    });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
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

module.exports = { registration, updateUser, deleteUser, getUsers, login };
