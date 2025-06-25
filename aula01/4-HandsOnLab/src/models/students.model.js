const mongoose = require('mongoose');

const studentCollection = 'estudantes';
const studentSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  sobrenome: {
    type: String,
    required: true
  },
  documento: {
    type: Number,
    required: true,
    unique: true
  },
  curso: {
    type: String,
    required: true
  },
  nota: {
    type: Number
  }
});

const studentModel = mongoose.model(studentCollection, studentSchema);

module.exports = studentModel;