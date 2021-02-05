const router = require('express').Router();
const { users } = require('./db');

const doesUserExist = (req, res, next) => {
  if (!users[req.params.id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  next(); // вызываем next
};

const sendUser = (req, res) => {
  res.send(users[req.params.id]);
};

router.get('/users/:id', doesUserExist);
router.get('/users/:id', sendUser);

module.exports = router;
