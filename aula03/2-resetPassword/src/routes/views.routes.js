const express = require('express');
const router = express.Router();

// Middlewares
function isAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

function isGuest(req, res, next) {
  if (!req.session.user) return next();
  res.redirect('/profile');
}

// Redireciona "/" para "/login"
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Views
router.get('/login', isGuest, (req, res) => {
  res.render('login', { error: req.query.error });
});

router.get('/register', isGuest, (req, res) => {
  res.render('register', { error: req.query.error });
});

router.get('/profile', isAuth, (req, res) => {
  res.render('profile', { user: req.session.user });
});

// views.router.js

router.get('/reset-password', isGuest, (req, res) => {
  res.render('reset-password', {
    error: req.query.error,
    success: req.query.success
  });
});

module.exports = router;
