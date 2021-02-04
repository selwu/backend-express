const express = require('express');
const router = require('./router');
const api = require('./api');
const { Port = 3000 } = process.env;
const app = express();

app.use('/', router);
app.use('/api', api);

app.listen(Port, () => {
  console.log('ok', Port);
});
