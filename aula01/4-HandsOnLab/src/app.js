const express = require('express');
const dbConn = require('./db/connection');

const app = express();

dbConn.then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.get('/', (req, res) => {
  res.send('Bem vindos, Coders!!!')
})

module.exports = app;