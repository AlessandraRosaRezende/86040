const { generateToken } = require('../utils/auth');
const userService = require('../services/user.service');

async function register(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await userService.validateCredentials(email, password);
  if (!user) return res.redirect('/users/login?error=1');

  const token = generateToken({ id: user._id, email: user.email, role: user.role });
  res.cookie('currentUser', token, { signed: true, httpOnly: true });
  res.redirect('/users/current');
}

async function logout(req, res) {
  res.clearCookie('currentUser');
  res.json({ message: 'Logged out' });
}

async function register(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    res.json({ message: 'Usuário criado com sucesso', userId: newUser._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login, logout, register };
