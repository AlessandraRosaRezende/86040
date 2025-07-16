const User = require('../models/user.model');
const { comparePassword } = require('../utils/auth');

const createUser = async(data) => {
  return User.create(data);
}

const findByEmail = async(email) => {
  return User.findOne({ email }).lean();
}

const findById = async(id) => {
  return User.findById(id).lean();
}

const validateCredentials = async(email, pwd) => {
  const user = await User.findOne({ email }).lean();
  if (!user) return null;
  const isValid = await comparePassword(pwd, user.password);
  return isValid ? user : null;
}

module.exports = { createUser, findByEmail, findById, validateCredentials };
