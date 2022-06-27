const User = require('../models/UserModel');

const bcrypt = require('bcryptjs');

exports.postNewUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/register');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hashedPassword
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/');
                });
        })
        .catch(err => {
            console.log(err);
        });
};