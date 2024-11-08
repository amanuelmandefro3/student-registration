const Payment = require("../models/Payment");

// Create a new payment
const createPayment = async (req, res, next) => {
  try {
    const { registrationId, amount, paymentType, paymentStatus } = req.body;

    const payment = new Payment({
      registrationId,
      amount,
      paymentType,
      paymentStatus: paymentStatus || "Pending",
    });

    const savedPayment = await payment.save();
    res.status(201).json({ success: true, data: savedPayment });
  } catch (error) {
    next(error);
  }
};

// Get all payments
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

// Get payments by registration ID
const getPaymentsByRegistrationId = async (req, res, next) => {
  try {
    const payments = await Payment.find({
      registrationId: req.params.registrationId,
    });
    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

const updatePayment = async (req, res, next) => {
  try {
    const { amount, paymentType, paymentStatus } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    const updatedAmount = req.body.amount || payment.amount;
    const updatedPaymentType = req.body.paymentType || payment.paymentType;
    const updatedPaymentStatus =
      req.body.paymentStatus || payment.paymentStatus;
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        amount: updatedAmount,
        paymentType: updatedPaymentType,
        paymentStatus: updatedPaymentStatus,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    res.json({ success: true, data: updatedPayment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  getPaymentsByRegistrationId,
  updatePayment,
  getAllPayments,
};
