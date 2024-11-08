const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { validateRegistration } = require('../middlewares/validationMiddleware');
const { route } = require('express/lib/router');


router.post('/', validateRegistration, registrationController.registerStudent);
router.get('/:id', registrationController.getRegistrationById);
router.get('/', registrationController.getAllRegistrations);
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;
