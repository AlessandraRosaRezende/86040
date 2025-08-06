const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');

router.post('/register', sessionController.register);
router.post('/login', sessionController.login);
router.get('/logout', sessionController.logout);
router.post('/reset-password', sessionController.handleReset);
router.get('/reset-password', sessionController.renderResetForm);

module.exports = router;
