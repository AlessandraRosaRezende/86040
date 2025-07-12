const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');

// Tela de registro
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const { email } = req.body;
  // gravar em memória (sem banco)
  req.app.locals.users = req.app.locals.users || [];
  req.app.locals.users.push({ email });
  res.redirect('/login');
});

// Tela de login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email } = req.body;
  const users = req.app.locals.users || [];
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.redirect('/login');
  }
  const token = authService.generateToken({ email });
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 60 * 1000 // 1 minuto
  });
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  res.clearCookie('access_token'); 
  res.redirect('/login');
});

module.exports = router;
