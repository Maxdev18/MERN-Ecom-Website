const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authentication/userModel');

// Authentication Controllers
const authController = require('../controllers/auth');

//Authentication routes
router.get('/register', authController.register);

router.get('/login', authController.login);

router.get('/forgotPassword', authController.forgotPassword);

router.put('/resetPassword/:resetToken', authController.resetPassword);

// Validation route
router.post('/login', authController.register_post);

// try {
    //     const { email, password, verifyPassword } = req.body;

    //     // Validation
    //     if(!email || !password || !verifyPassword) {
    //         return res.status(400).json({errorMessage: 'Please enter all required fields.'});
    //     };

    //     if(password.length < 6) {
    //         return res.status(400).json({errorMessage: 'Please enter a password of at least 6 characters.'})
    //     };

    //     if(password !== verifyPassword) {
    //         return res.status(400).json({errorMessage: 'Please enter the same password twice.'})
    //     };

    //     const existingUser = await User.findOne({email});
    //     if(existingUser) {
    //         return res.status(400).json({errorMessage: 'An account with this email already exists.'})
    //     };

    //     // Hash the password
    //     const salt = await bcrypt.genSalt();
    //     const passwordHash = await bcrypt.hash(password, salt);

    //     // Save a new user account to the database
    //     const newUser = new User({
    //         email, passwordHash
    //     });

    //     const savedUser = await newUser.save(err => {
    //         if(err) {
    //             res.status(500).json({ msg: 'Sorry, internal server error' });
    //         } else {
    //             res.json({ msg: 'Your data has been saved!' });
    //         }
    //     });

    //     // Sign the token
    //     const token = jwt.sign({
    //         user: savedUser._id
    //     }, process.env.JWT_SECRET);

    //     // Send the token in a HTTP-only cookie
    //     res.cookie('token', token, {
    //         httpOnly: true
    //     }).send();

    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send();
    // }

//Export Routes
module.exports = router;