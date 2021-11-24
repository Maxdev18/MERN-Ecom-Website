const express = require('express');
const router = express.Router();

// Authentication Controllers
const authController = require('../controllers/auth');

//Authentication routes
router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);

router.put('/resetPassword/:resetToken', authController.resetPassword);

router.get('/checkauth', authController.checkAuth);

router.get('/logout', authController.logoutUser);

//Export Routes
module.exports = router;