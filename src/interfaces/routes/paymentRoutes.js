const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const { validatePayment } = require('../middleware/validationMiddleware');

router.post('/', validatePayment, PaymentController.createPayment);
router.get('/registration/:registrationId', PaymentController.getPaymentsByRegistrationId);
router.put('/:id', validatePayment, PaymentController.updatePayment);

module.exports = router;
