const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const publicController = require('../controllers/public');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const serviceController = require('../controllers/ServiceController');
const paymentController = require('../controllers/paymentController')


const adminData = require('./admin');


const router = express.Router();

router.get('/', publicController.home);

router.get('/aboutUs', publicController.aboutUs);

router.get('/contactUs', isAuth, publicController.contactUs);

router.post('/postcontactMessage', isAuth, adminController.postContactUs);

router.get('/services', isAuth, publicController.services);

router.get('/register', publicController.register);

router.post('/postNewUser', adminController.postNewUser);

router.post('/postLogin', adminController.postLogin);

router.post('/logout', adminController.logout);

router.get('/manage-services', isAuth, serviceController.getServices);

router.post('/addservice', isAuth, serviceController.AddService);

router.post('/deleteservice', isAuth, serviceController.DeleteService);

router.post('/checkout', isAuth,  paymentController.getCheckout);

router.get('/payment', isAuth, publicController.payment);

module.exports = router;