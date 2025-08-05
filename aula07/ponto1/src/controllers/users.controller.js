const getUsers = async (req, res) => {
  res.send({ status: "success", result: "users" });
};

const getUserById = async (req, res) => {
  res.send({ status: "success", result: "user" });
};

const createUser = async (req, res) => {
  res.send({ status: "success", result: "userCreated" });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
