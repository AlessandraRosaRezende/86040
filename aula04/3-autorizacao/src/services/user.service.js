const User = require('../models/user.model');
const { comparePassword } = require('../utils/auth');

async function createUser(data) {
  return User.create(data);
}

async function findByEmail(email) {
  return User.findOne({ email }).lean();
}

async function findById(id) {
  return User.findById(id).lean();
}

async function validateCredentials(email, pwd) {
  const user = await User.findOne({ email }).lean();
  if (!user) return null;
  const isValid = await comparePassword(pwd, user.password);
  return isValid ? user : null;
}

module.exports = { createUser, findByEmail, findById, validateCredentials };
