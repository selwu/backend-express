const Todo = require('../models/todo');

const createTodo = (req, res) => {
  const { text, creatorId } = req.body;
  console.log(creatorId);

  Todo.create({ text, creator: creatorId })
    // .populate('creator')
    .then((todo) => res.send({ data: todo }));
};

const getTodos = (req, res) => {
  Todo.find({})
    .populate('creator')
    .then((todo) => res.send({ data: todo }));
};

module.exports = { createTodo, getTodos };
