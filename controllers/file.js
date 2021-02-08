const File = require('../models/file');

const createTodo = (req, res) => {
  const { text, creatorId } = req.body;
  console.log(creatorId);

  File.create({ text, creator: creatorId })
    // .populate('creator')
    .then((todo) => res.send({ data: todo }));
};

const getTodos = (req, res) => {
  File.find({})
    // .populate('creator')
    .then((todo) => res.send({ data: todo }));
};

module.exports = { createTodo, getTodos };
