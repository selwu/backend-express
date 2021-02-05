const express = require('express');
const router = require('./router');
const { Port = 3000 } = process.env;
const app = express();

const logger = (req, res, next) => {
  console.log('Запрос залогирован!');
  next();
};

app.use(logger);
app.use('/', router);

app.listen(Port, () => {
  console.log('ok', Port);
});
