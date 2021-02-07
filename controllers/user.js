const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const { password, email } = req.body;
    const credential = await User.findOne({ email });
    if (credential) {
      return res.status(400).send({ message: "User exist" });
    }
    const userHash = await bcrypt.hash(password, 5);
    const user = await User.create({ password: userHash, email });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "2d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: "Some Error" }));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  )
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: "Some Error" }));
};

const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: "Some Error" }));
};

module.exports = { registration, updateUser, deleteUser, getUsers, login };
