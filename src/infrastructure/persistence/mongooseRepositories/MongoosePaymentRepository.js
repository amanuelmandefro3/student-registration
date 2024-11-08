const PaymentRepository = require("../../../domain/repositories/PaymentRepository");
const PaymentModel = require("../mongoose/PaymentModel");
const Payment = require("../../../domain/entities/Payment");

class MongoosePaymentRepository extends PaymentRepository {
  async create(paymentData) {
    const payment = await PaymentModel.create(paymentData);
    return new Payment({
      id: payment._id,
      registrationId: payment.registrationId,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      paymentType: payment.paymentType,
      paymentStatus: payment.paymentStatus,
    });
  }

  async findByRegistrationId(registrationId) {
    const payments = await PaymentModel.find({ registrationId });
    return payments.map(
      (payment) =>
        new Payment({
          id: payment._id,
          registrationId: payment.registrationId,
          amount: payment.amount,
          paymentDate: payment.paymentDate,
          paymentType: payment.paymentType,
          paymentStatus: payment.paymentStatus,
        })
    );
  }

  async update(id, paymentData) {
    const payment = await PaymentModel.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
    if (!payment) return null;
    return new Payment({
      id: payment._id,
      registrationId: payment.registrationId,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      paymentType: payment.paymentType,
      paymentStatus: payment.paymentStatus,
    });
  }

  async delete(id) {
    const payment = await PaymentModel.findByIdAndDelete(id);
    if (!payment) return null;
    return new Payment({
      id: payment._id,
      registrationId: payment.registrationId,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      paymentType: payment.paymentType,
      paymentStatus: payment.paymentStatus,
    });
  }
}

module.exports = MongoosePaymentRepository;
