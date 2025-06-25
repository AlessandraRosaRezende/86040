const usersModel = require('../models/users.model');

const getAllUsers = async () => {
  const users = await usersModel.find().lean();
  return users;
}

const getUserById = async (id) => {
  const user = await usersModel.findById(id).lean();
  return user;
}

const createUser = async (userData) => {
  const newUser = await usersModel.create(userData);
  return newUser
}

const updateUser = async (id, userData) => {
  const userUpdated = await usersModel.findByIdAndUpdate(id, userData, { new: true }).lean();
  return userUpdated;
}

const updateUserAllFields = async (id, userData) => {
  const userUpdated = await usersModel.findByIdAndUpdate(id, userData, { new: true }).lean();
  return userUpdated;
}

const deleteUser = async (id) => {
  const userDeleted = await usersModel.findByIdAndDelete(id);
  return userDeleted;
}

const deleteAllUsers = async () => {
  const deletedUsers = await usersModel.deleteMany({});
  return deletedUsers;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  updateUserAllFields
};