const Joi = require('joi');

// Validation for creating/updating a student
const validateStudent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    phoneNumber: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    status: Joi.string().valid('Active', 'Inactive').optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Validation for creating/updating a course
const validateCourse = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    type: Joi.string().valid('One-time', 'Long-duration').required(),
    pricing: Joi.object({
      one_time: Joi.object({
        shift_prices: Joi.array()
          .items(
            Joi.object({
              shift_id: Joi.string().length(24).required(), // Assuming ObjectId
              price: Joi.number().min(0).required(),
            })
          )
          .required(),
      }),
      long_duration: Joi.object({
        price_per_month: Joi.object({
          '1_month': Joi.number().min(0).required(),
          '2_months': Joi.number().min(0).required(),
          '3_months': Joi.number().min(0).required(),
          '6_months': Joi.number().min(0).required(),
        }).required(),
      }),
    }).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Validation for creating/updating a shift
const validateShift = (req, res, next) => {
  const schema = Joi.object({
    shiftName: Joi.string().valid('Morning', 'Afternoon', 'Night', 'Full Day').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Validation for creating a registration
const validateRegistration = (req, res, next) => {
  const schema = Joi.object({
    studentId: Joi.string().length(24).required(),
    courseId: Joi.string().length(24).required(),
    startDate: Joi.date().required(),
    shiftId: Joi.string().length(24).optional(),
    duration: Joi.string().valid('1 Month', '2 Months', '3 Months', '6 Months').optional(),
  }).xor('shiftId', 'duration'); // Ensure either shiftId or duration is present

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

// Validation for creating/updating a payment
const validatePayment = (req, res, next) => {
  const schema = Joi.object({
    registrationId: Joi.string().length(24).required(),
    amount: Joi.number().min(0).required(),
    paymentDate: Joi.date().optional(),
    paymentType: Joi.string().valid('One-time', 'Monthly').required(),
    paymentStatus: Joi.string().valid('Pending', 'Completed', 'Failed').optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateStudent,
  validateCourse,
  validateShift,
  validateRegistration,
  validatePayment,
};
