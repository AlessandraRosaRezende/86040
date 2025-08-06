const { verifyToken } = require('../utils/auth');
const userService = require('../services/user.service');

const checkAuth = async(req, res, next) => {
  const token = req.signedCookies.currentUser;
  if (!token) return res.redirect('/users/login');
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.clearCookie('currentUser');
    res.redirect('/users/login');
  }
}

const checkNotAuth = async(req, res, next) => {
  if (req.signedCookies.currentUser) {
    return res.redirect('/users/current');
  }
  next();
}

const showLogin = async(req, res) => {
  const error = req.query.error;
  res.render('login', { error });
}

const showCurrent = async(req, res) => {
  const user = await userService.findById(req.user.id);
  if (!user) return res.redirect('/users/login');
  res.render('current', { user });
}

const showRegister = async(req, res) => {
  const error = req.query.error;
  res.render('register', { error });
}

module.exports = { checkAuth, checkNotAuth, showLogin, showCurrent, showRegister };
