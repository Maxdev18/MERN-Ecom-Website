const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/authentication/userModel');

exports.register = async (req, res) => {
    const newUser = req.body;

    // Check if email is already taken
    const takenEmail = await User.findOne({email: newUser.email});

    if(takenEmail) {
        res.json({message: "This email is already taken"});
    } else {
        // Hash password
        newUser.password = await bcrypt.hash(req.body.password, 10);

        // Save user in DB
        const dbUser = new User({
            firstName: newUser.firstName.toLowerCase(),
            lastName: newUser.lastName.toLowerCase(),
            email: newUser.email.toLowerCase(),
            password: newUser.password
        });

        dbUser.save(err => {
            console.log(err);
        });
        res.json({message: "Successfully Registered!"});
    }
};

exports.login = (req, res) => {
    const userLoggingIn = req.body;
    console.log(userLoggingIn)

    User.findOne({ email: userLoggingIn.email })
        .then(dbUser => {
            if(!dbUser) {
                return res.json({message: "Invalid email or password"})
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if(isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            email: dbUser.email
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 86400 },
                            (err, token) => {
                                if(err) {
                                    return res.json({message: err})
                                }
                                return res.json({
                                    message: "Login Successful",
                                    token: "Bearer" + token
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message: "Invalid email or password"
                        })
                    }
                })
        })
};

exports.forgotPassword = (req, res, next) => {
    res.render('forgotpassword');
};

exports.resetPassword = (req, res, next) => {
    res.send('Reset Password Route');
};