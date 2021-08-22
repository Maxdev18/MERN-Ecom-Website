const express = require('express');
const router = express.Router();
const User = require('../models/authentication/userModel');

// Authentication Controllers
const authController = require('../controllers/auth');

//Authentication routes
router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);

router.put('/resetPassword/:resetToken', authController.resetPassword);

//Export Routes
module.exports = router;