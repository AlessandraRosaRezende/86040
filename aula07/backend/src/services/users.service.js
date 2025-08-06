const usersDao = require("../dao/users.dao");

const getUsers = async () => {
  const users = await usersDao.getUsers();
  return users;
};

const getUserById = async (id) => {
  const user = await usersDao.getUserById(id);
  if (!user) return null;
  return user;
};

const createUser = async (userData) => {
  const user = await usersDao.createUser(userData);
  return user;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
