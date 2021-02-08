const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { registration, deleteUser, updateUser, getUsers, login } = require('../controllers/user');

router.post(
  '/registration',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
      })
      .unknown(true),
  }),
  registration,
);

router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);

router.get('/', getUsers);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

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
