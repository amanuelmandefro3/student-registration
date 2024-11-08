const PaymentUseCases = require("../../application/use_cases/paymentUseCases");
const MongoosePaymentRepository = require("../../infrastructure/persistence/mongooseRepositories/MongoosePaymentRepository");

const paymentRepo = new MongoosePaymentRepository();
const paymentUseCases = new PaymentUseCases(paymentRepo);

class PaymentController {
  async createPayment(req, res, next) {
    try {
      const payment = await paymentUseCases.createPayment(req.body);
      res.status(201).json({ success: true, data: payment });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentsByRegistrationId(req, res, next) {
    try {
      const payments = await paymentUseCases.getPaymentsByRegistrationId(
        req.params.registrationId
      );
      res.json({ success: true, data: payments });
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req, res, next) {
    try {
      const updatedPayment = await paymentUseCases.updatePayment(
        req.params.id,
        req.body
      );
      res.json({ success: true, data: updatedPayment });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
