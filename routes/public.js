const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const publicController = require('../controllers/public');
const contactController = require('../controllers/ContactController');
const userController = require('../controllers/UserController');
const serviceController = require('../controllers/ServiceController');


const adminData = require('./admin');


const router = express.Router();

router.get('/', publicController.home);

router.get('/aboutUs', publicController.aboutUs);

router.get('/contactUs', publicController.contactUs);

router.post('/postcontactMessage', contactController.postContactUs);

router.get('/services', publicController.services);

router.get('/register', publicController.register);

router.get('/manage-services', serviceController.getServices);

router.post('/postNewUser', userController.postNewUser);

router.post('/addservice', serviceController.AddService);

router.post('/deleteservice', serviceController.DeleteService);

module.exports = router;