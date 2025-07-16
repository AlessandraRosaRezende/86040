const express = require('express');
const { checkNotAuth, showLogin, showCurrent, showRegister } = require('../controllers/views.controller');
const { register } = require('../controllers/user.controller');
const passport = require('passport');
const { passportCall, authorization } = require('../utils/auth');

const router = express.Router();

router.get('/login', checkNotAuth, showLogin);
router.get('/register', checkNotAuth, showRegister);
router.post('/register', register);
router.get('/current', passportCall('jwt'), authorization('admin'), showCurrent)

module.exports = router;
