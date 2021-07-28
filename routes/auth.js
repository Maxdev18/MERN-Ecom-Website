const express = require('express');
const router = express.Router();

// Authentication Controllers
const authController = require('../controllers/auth');

//Authentication routes
router.get('/register', authController.register);

router.get('/login', authController.login);

router.post('/forgotPssword', authController.forgotPassword);

router.put('/resetPassword/:resetToken', authController.resetPassword);

//Export Routes
module.exports = router;