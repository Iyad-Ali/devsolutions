const Service = require('../models/ServiceModel');


exports.AddService = (req, res, next) => {
    console.log(req.body);
    Service.findOne({ name: req.body.name })
        .then((service) => {
            if (service) {
                service.price = req.body.price;
                service.description = req.body.description;
                service
                    .save()
                    .then(result => {
                        console.log('service updated!');
                        res.redirect('/manage-services');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                Service
                    .create({
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description
                    })
                    .then(result => {
                        console.log('service added!');
                        res.redirect('/manage-services');
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
};

exports.DeleteService = (req, res, next) => {

    Service.findOneAndRemove({ name: req.body.name })
        .then((service) => {
            if (!service) {
                res.status(400).send(req.body.name + ' was not found');
            } else {
                console.log('service deleted!');
                res.redirect('/manage-services');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
}

exports.getServices = (req, res, next) => {
    Service.find({})
        .then(services => {
            res.render('manage-services', {
                services: services,
                pageTitle: 'Manage Services',
                path: '/manage-services',
                isAuthenticated: req.session.isLoggedIn,
                user: req.session.user
            });
        })
        .catch(err => console.log(err));
};