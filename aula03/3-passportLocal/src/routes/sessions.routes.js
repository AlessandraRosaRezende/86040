const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const passport = require('passport');

router.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister'}), async(req, res) => {
  res.redirect('/login');
});

router.get('/failregister', async(req, res) => {
  console.log('Failed Register Strategy');
  res.send({ error: "Failed Register" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
  if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    age: req.user.age,
    email: req.user.email
  }
  res.redirect('/profile')
});

router.get('/faillogin', async (req, res) => {
  console.log('Failed login Strategy');
  res.send({ error: "Failed Login" })
})

router.get('/logout', sessionController.logout);
router.post('/reset-password', sessionController.handleReset);
router.get('/reset-password', sessionController.renderResetForm);

module.exports = router;
