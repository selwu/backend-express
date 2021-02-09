const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerFile = require('./routes/file');
const { Port } = process.env;
const mongoUri = process.env.MONGO_CONFIG;
const app = express();
const { errors } = require('celebrate');

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(Port, () => {
      console.log('ok', Port);
    });
  } catch (err) {
    console.error('Server Error: ', err.message);
    process.exit(1);
  }
};

const logger = (req, res, next) => {
  console.log('Запрос залогирован!');
  next();
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});
app.use(logger);
app.use(bodyParser.json());
app.use('/users', routerUser);
app.use('/files', routerFile);
app.use(errors());

start();
