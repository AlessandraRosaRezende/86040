const express = require('express');
const { checkAuth, checkNotAuth, showLogin, showCurrent, showRegister } = require('../controllers/views.controller');
const { register } = require('../controllers/user.controller');
const router = express.Router();

router.get('/login', checkNotAuth, showLogin);
router.get('/current', checkAuth, showCurrent);
router.get('/register', checkNotAuth, showRegister);
router.post('/register', register);

module.exports = router;
