const userModel = require("../models/users.model");

const getUsers = async () => {
  let users = await userModel.find();
  users = users.map((u) => {
    u.toJSON();

    return u;
  });
  return users;
};

const getUserById = async (id) => {
  const user = await userModel.findById(id);

  return user;
};

const createUser = async (user) => {
  const userCreated = await userModel.create(user);
  return userCreated;
};

const updateUser = async (id, user) => {
  const userUpdated = await userModel.findByIdAndUpdate(id, { $set: user })
  return userUpdated;
}

module.exports = { getUsers, createUser, getUserById, updateUser };
