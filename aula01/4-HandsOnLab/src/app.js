const express = require('express');
const dbConn = require('./db/connection');
const studentRouter = require('./routes/students.router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConn.then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Database connection failed:', error);
});

app.use('/api/students', studentRouter);

app.get('/', (req, res) => {
  res.send('Bem vindos, Coders!!!')
})

module.exports = app;