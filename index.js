const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');
const { Port = 5000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const logger = (req, res, next) => {
  console.log('Запрос залогирован!');
  next();
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(logger);
app.use('/', router);

app.listen(Port, () => {
  console.log('ok', Port);
});
