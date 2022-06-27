const adminController = require('../models/userController');

router.post('/postNewUser', adminController.postNewUser);