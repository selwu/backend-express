const router = require('express').Router();
const { createTodo, getTodos } = require('../controllers/file');

router.get('', getTodos);

router.post('', createTodo);

module.exports = router;
