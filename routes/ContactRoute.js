const adminController = require('../controllers/contactController');

router.post('/postcontactMessage', adminController.postContactUs);