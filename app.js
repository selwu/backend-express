const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routerUser = require('./routes/users');
const routerTodo = require('./routes/todo');
const { Port = 5000 } = process.env;
const app = express();

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sasha:sasha@cluster0.iixb1.mongodb.net/app?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    );

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
  next();
});

app.use(logger);
app.use(bodyParser.json());
app.use('/users', routerUser);
app.use('/todo', routerTodo);

start();
