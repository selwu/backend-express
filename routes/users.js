const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddlewares = require('../middlewares/auth');
const { registration, login, auth, allUsers } = require('../controllers/user');

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

router.get('/auth', authMiddlewares, auth);

router.get('/all', allUsers);

module.exports = router;
