const mongoose = require('mongoose');

const dbConn = mongoose.connect('mongodb+srv://alessandra:coder@clustercoder.n6nab.mongodb.net/coderhouse?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database connected successfully');
  }
  ).catch((error) => {
    console.error('Database connection error:', error);
  });

module.exports = dbConn;