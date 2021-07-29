exports.register = (req, res, next) => {
    res.render('register');
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