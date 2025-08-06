require('dotenv').config();
const mongoose = require('mongoose')

const port = process.env.PORT;
const url = process.env.MONGO_URL;

const connection = () => {
  return mongoose
    .connect(url)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = {
  port,
  connection
}