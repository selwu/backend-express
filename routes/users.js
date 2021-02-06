const router = require('express').Router();
const User = require('../models/user');

router.post('', (req, res) => {
  console.log(req.body);
  const { name, about, email } = req.body;
  User.create({ name, about, email })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: ' Some Error' }));
});

router.get('', (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
});

router.patch('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: 'Some Error' }));
});

// const { users } = require('../db');

// const doesUserExist = (req, res, next) => {
//   if (!users[req.params.id]) {
//     res.status(404).send({});
//     return;
//   }
//
//   next(); // вызываем next
// };
//
// const sendUser = (req, res) => {
//   res.send(users[req.params.id]);
// };

// router.get('/users/:id', doesUserExist);
// router.get('/users/:id', sendUser);

module.exports = router;
