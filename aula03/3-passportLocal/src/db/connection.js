require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URL
const dbConn = mongoose.connect(url)
  .then(() => {
    console.log('Database connected successfully');
  }).catch((error) => {
    console.error('Database connection error:', error);
  });

module.exports = {
  dbConn,
  url
};