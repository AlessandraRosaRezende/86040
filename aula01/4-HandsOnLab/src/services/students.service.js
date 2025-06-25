const studentModel = require('../models/students.model');

const getAllStudents = async () => {
  const students = await studentModel.find().lean();
  return students;
}

const getStudentById = async (id) => {
  const student = await studentModel.findById(id).lean();
  return student;
}

const createStudent = async (studentData) => {
  const newStudent = await studentModel.create(studentData);
  return newStudent
}

const updateStudent = async (id, studentData) => {
  const studentUpdated = await studentModel.findByIdAndUpdate(id, studentData, { new: true }).lean();
  return studentUpdated;
}

const updateStudentAllFields = async (id, studentData) => {
  const studentUpdated = await studentModel.findByIdAndUpdate(id, studentData, { new: true }).lean();
  return studentUpdated;
}

const deleteStudent = async (id) => {
  const studentDeleted = await studentModel.findByIdAndDelete(id);
  return studentDeleted;
}

const deleteAllStudents = async () => {
  const deletedStudents = await studentModel.deleteMany({});
  return deletedStudents;
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