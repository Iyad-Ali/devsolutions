const Contact = require('../models/ContactModel');

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