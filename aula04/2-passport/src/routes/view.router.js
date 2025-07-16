const express = require('express');
const { checkNotAuth, showLogin, showCurrent, showRegister } = require('../controllers/views.controller');
const { register } = require('../controllers/user.controller');
const passport = require('passport');
const { passportCall } = require('../utils/auth');

const router = express.Router();

router.get('/login', checkNotAuth, showLogin);
router.get('/register', checkNotAuth, showRegister);
router.post('/register', register);
// router.get('/current', passport.authenticate('jwt', { session: false, failureRedirect: '/users/login' }), showCurrent);
// router.get('/current', passport.authenticate('jwt', { session: false }), showCurrent);
router.get('/current', passportCall('jwt'), showCurrent)

module.exports = router;
