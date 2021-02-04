const express = require('express');
const { users } = require('./db');
const { Port = 3000 } = process.env;
const app = express();

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  if (!users[id]) {
    res.status(200).send('Sorry we dont have him');
    return;
  }
  const { name, age } = users[id];
  res.status(200).send(`name: ${name}, age: ${age}`);
});

app.listen(Port, () => {
  console.log('ok', Port);
});
