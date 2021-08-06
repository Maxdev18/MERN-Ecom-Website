const User = require('../models/authentication/userModel');

exports.register = (req, res, next) => {
    res.render('register');
};

exports.register_post = async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
};

exports.login = (req, res, next) => {
    res.render('login');
};

exports.forgotPassword = (req, res, next) => {
    res.render('forgotpassword');
};

exports.resetPassword = (req, res, next) => {
    res.send('Reset Password Route');
};