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
      token, user: {
      email: user.email,
      diskSpace: user.diskSpace,
      avatar: user.avatar,
      usedSpace: user.usedSpace,
      id: user._id,
    }
    });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

const auth = async (req, res) => {
  try {
    const user = await User.findOne({id: req.user.id});
    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: '2d',
    });
    res.send({ 
      token, user: {
      email: user.email,
      diskSpace: user.diskSpace,
      avatar: user.avatar,
      usedSpace: user.usedSpace,
      id: user._id,
    }
    });
  } catch (err) {
    res.send({message: 'Ошибка сервера'});
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
};

module.exports = { registration, getUsers, login, auth };
