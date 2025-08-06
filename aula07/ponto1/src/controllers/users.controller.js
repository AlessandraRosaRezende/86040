const usersDao = require("../dao/users.dao");

const getUsers = async (req, res) => {
  try {
    const users = await usersDao.getUsers();
    return res.status(200).send({ status: "success", result: users });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersDao.getUserById(id);
    if (!user) return res.status(404).send({ message: "User not found" })
    return res.status(200).send({ status: "success", result: user });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message }); 
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userCreated = await usersDao.createUser(userData)
    return res.status(201).send({ message: userCreated})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message }); 
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
