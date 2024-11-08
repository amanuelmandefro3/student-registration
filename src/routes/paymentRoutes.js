// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validatePayment } = require('../middlewares/validationMiddleware');

router.get('/', paymentController.getAllPayments);
router.post('/', validatePayment, paymentController.createPayment);
router.get('/registration/:registrationId', paymentController.getPaymentsByRegistrationId);
router.put('/:id', paymentController.updatePayment);

module.exports = router;
