const express = require('express');
const dbConn = require('./db/connection');
const usersRouter = require('./routes/users.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to the database

dbConn.then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

module.exports = app;