class Payment {
  constructor({
    id,
    registrationId,
    amount,
    paymentDate,
    paymentType,
    paymentStatus,
  }) {
    this.id = id;
    this.registrationId = registrationId;
    this.amount = amount;
    this.paymentDate = paymentDate;
    this.paymentType = paymentType;
    this.paymentStatus = paymentStatus;
  }
}

module.exports = Payment;
