const { Router } = require('express');
const studentController = require('../controllers/students.controller');

const studentRouter = Router();

studentRouter.get('/', studentController.getAllStudents);
studentRouter.get('/:id', studentController.getStudentById);
studentRouter.post('/', studentController.createStudent);
studentRouter.put('/:id', studentController.updateStudent);
studentRouter.patch('/:id', studentController.updateStudentAllFields);
studentRouter.delete('/:id', studentController.deleteStudent);
studentRouter.delete('/', studentController.deleteAllStudents);

module.exports = studentRouter;