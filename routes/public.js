const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const publicController = require('../controllers/public');
const adminData = require('./admin');

const router = express.Router();

router.get('/', publicController.home);

router.get('/aboutUs', publicController.aboutUs);

router.get('/contactUs', publicController.contactUs);

router.get('/services', publicController.services);

router.get('/register', publicController.register);

module.exports = router;