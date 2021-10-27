/* Note: We need to send a validation request for every page reload or redirect
to check for JWT is valid
- Can't put it in every controller because too repetative
*/

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
        // Hash password, the 2nd param in hash function is the salt
        newUser.password = await bcrypt.hash(req.body.password, 10);

        // Save user into DB
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

exports.login = (req, res, next) => {
    const userLoggingIn = req.body;

    // Check for email in DB
    User.findOne({ email: userLoggingIn.email })
        .then(dbUser => {
            if(!dbUser) {
                return res.json({message: "Invalid email or password"})
            }
            // Compare passwords if same or not
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if(isCorrect) {
                        // Sign the JWT
                        jwt.sign({ user: dbUser }, process.env.JWT_SECRET, { expiresIn: '60m' },
                            (err, token) => {
                                if(err) {
                                    return res.json({message: err})
                                } else {
                                    res.cookie("token", token, { httpOnly: true })
                                    res.redirect("http://localhost:3000")
                                }
                            }
                        );
                        
                    } else {
                        return res.json({
                            message: "Invalid email or password"
                        })
                    }
                })
        })
};

exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    res.send({ success: true });
  };

exports.forgotPassword = (req, res, next) => {
    res.render('forgotpassword');
};

exports.resetPassword = (req, res, next) => {
    res.send('Reset Password Route');
};

exports.checkAuth = (req, res, next) => {
    //Retrieves token
    let token = req.cookies.token;

    //Try to verify token and return data if verified
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        res.json(req.user);
    } catch {
        //Clear cookie with token if expired or doesn't exist
        res.clearCookie("token");
        res.redirect('/');
        return;
    }
}