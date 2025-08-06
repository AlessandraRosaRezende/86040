const userService = require("../services/users.service");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.status(200).send({ result: users });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ result: user });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userCreated = await userService.createUser(userData);
    return res.status(201).send({ result: userCreated });
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
