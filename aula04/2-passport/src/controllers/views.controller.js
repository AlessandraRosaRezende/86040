const { verifyToken } = require('../utils/auth');
const userService = require('../services/user.service');

function checkAuth(req, res, next) {
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

function checkNotAuth(req, res, next) {
  if (req.signedCookies.currentUser) {
    return res.redirect('/users/current');
  }
  next();
}

async function showLogin(req, res) {
  const error = req.query.error;
  res.render('login', { error });
}

async function showCurrent(req, res) {
  const user = await userService.findById(req.user.id);
  if (!user) return res.redirect('/users/login');
  res.render('current', { user });
}

async function showRegister(req, res) {
  const error = req.query.error;
  res.render('register', { error });
}

module.exports = { checkAuth, checkNotAuth, showLogin, showCurrent, showRegister };
