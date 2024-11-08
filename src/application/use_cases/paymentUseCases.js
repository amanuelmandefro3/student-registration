const Payment = require("../../domain/entities/Payment");
const PaymentRepository = require("../../domain/repositories/PaymentRepository");

class PaymentUseCases {
  constructor(paymentRepository) {
    this.paymentRepo = paymentRepository;
  }

  async createPayment(data) {
    const { registrationId, amount, paymentDate, paymentType, paymentStatus } =
      data;
    const payment = new Payment({
      id: null,
      registrationId,
      amount,
      paymentDate: paymentDate || new Date(),
      paymentType,
      paymentStatus: paymentStatus || "Pending",
    });
    return await this.paymentRepo.create(payment);
  }

  async getPaymentsByRegistrationId(registrationId) {
    const payments =
      await this.paymentRepo.findByRegistrationId(registrationId);
    return payments;
  }

  async updatePayment(id, data) {
    const updatedPayment = await this.paymentRepo.update(id, data);
    if (!updatedPayment) {
      throw new Error("Payment not found");
    }
    return updatedPayment;
  }

  async deletePayment(id) {
    const deletedPayment = await this.paymentRepo.delete(id);
    if (!deletedPayment) {
      throw new Error("Payment not found");
    }
    return deletedPayment;
  }
}

module.exports = PaymentUseCases;
