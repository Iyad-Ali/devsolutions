const Contact = require('../models/contact');

const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.postContactUs = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const service = req.body.service;
    const message = req.body.message;

    const contact = new Contact({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        service: service,
        message: message
    });
    contact
        .save()
        .then(result => {
            console.log('Contact message saved!');
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });

};


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

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.redirect('/register');
            } else {
                bcrypt.compare(password, user.password)
                    .then(doMatch => {
                        if (doMatch) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            return req.session.save(err => {
                                console.log(err);
                                res.redirect('/');
                            });
                            console.log('logged in successfully');
                            return res.redirect('/');
                        }
                        res.redirect('/register');
                    })
                    .catch(err => {
                        console.log(err);
                        return res.redirect('/register');
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });

};

exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};