const Service = require('../models/ServiceModel');


exports.AddService = (req, res, next) => {
    Service.findOne({ name: req.body.name })
        .then((service) => {
            if (service) {
                service.price = req.body.price;
                service.description = req.body.description;
                service
                    .save()
                    .then(result => {
                        console.log('service updated!');
                        res.redirect('/');
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
                    .then((user) => { res.status(201).json(user) })
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
                res.status(200).send(req.body.name + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
}