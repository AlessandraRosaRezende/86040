const userModel = require('../models/User');

async function registerUser(userData) {
  const existingUser = await userModel.findOne({ email: userData.email });
  if (existingUser) throw new Error('Usuário já existe');
  const user = await userModel.create(userData);
  return user;
}

async function loginUser(email, password) {
  const user = await userModel.findOne({ email, password });
  if (!user) throw new Error('Credenciais inválidas');
  return {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age
  };
}

module.exports = {
  registerUser,
  loginUser
};
