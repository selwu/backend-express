const router = require('express').Router();
const { users } = require('./db');

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!users[id]) {
    res.status(200).send('Sorry we dont have him');
    return;
  }
  const { name, age } = users[id];
  res.status(200).send(`name: ${name}, age: ${age}`);
});

module.exports = router;
