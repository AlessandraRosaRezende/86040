const { generateToken } = require('../utils/auth');
const userService = require('../services/user.service');

const register = async(req, res) => {
  try {
    await userService.createUser(req.body);
    res.json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;
  const user = await userService.validateCredentials(email, password);
  if (!user) return res.redirect('/users/login?error=1');

  const token = generateToken({ id: user._id, email: user.email, role: user.role });
  res.cookie('currentUser', token, { signed: true, httpOnly: true });
  res.redirect('/users/current');
}

const logout = async(req, res) => {
  res.clearCookie('currentUser');
  res.json({ message: 'Logged out' });
}

module.exports = { register, login, logout };
