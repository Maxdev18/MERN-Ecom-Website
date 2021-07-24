exports.register = (req, res, next) => {
    res.render('home');
};

exports.login = (req, res, next) => {
    res.send('Login Route');
};

exports.forgotPassword = (req, res, next) => {
    res.send('Forgot Password Route');
};

exports.resetPassword = (req, res, next) => {
    res.send('Reset Password Route');
};