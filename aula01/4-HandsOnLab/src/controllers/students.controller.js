const studentService = require('../services/students.service');

const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error });
  }
}

const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await studentService.getStudentById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving student', error });
  }
}

const createStudent = async (req, res) => {
  const { nome, sobrenome, documento, curso, nota } = req.body;
  try {
    const newStudent = await studentService.createStudent({ nome, sobrenome, documento, curso, nota });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
}

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { curso, nota } = req.body;
  try {
    const updatedStudent = await studentService.updateStudent(id, { curso, nota });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
}

const updateStudentAllFields = async (req, res) => {
  const { id } = req.params;
  const studentData = req.body; // Assuming the entire user object is sent for update
  try {
    const updatedStudent = await studentService.updateStudentAllFields(id, studentData);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
}

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await studentService.deleteStudent(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
}

const deleteAllStudents = async (req, res) => {
  try {
    await studentService.deleteAllStudents();
    res.status(200).json({ message: 'All students deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting all students', error });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  deleteAllStudents,
  updateStudentAllFields
};