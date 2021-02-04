const api = require('express').Router();

api.get('/', (req, res) => {
  const { id } = req.params;
  res.status(200).send(`name: ${id}`);
});

module.exports = api;
