const Registration = require("../models/Registration");
const Course = require("../models/Course");
const Shift = require("../models/Shift");
const Payment = require("../models/Payment");

// Register a student to a course
const registerStudent = async (req, res, next) => {
  try {
    const { studentId, courseId, startDate, shiftId, duration } = req.body;

    // Validate course existence
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const validDurations = ["1 Month", "2 Months", "3 Months", "6 Months"];
    if (duration && !validDurations.includes(duration)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid duration" });
    }

    if (shiftId) {
      const shift = await Shift.findById(shiftId);
      if (!shift) {
        return res
          .status(404)
          .json({ success: false, message: "Shift not found" });
      }
    }
    // Create registration
    const registration = new Registration({
      studentId,
      courseId,
      startDate,
      shiftId: shiftId ? shiftId : null,
      duration: duration ? duration : null,
    });

    const savedRegistration = await registration.save();

    // Handle payments
    if (shiftId) {
      const shiftPrice = course.pricing.one_time.shift_prices.find(
        (sp) => sp.shift_id.toString() === shiftId
      );
      if (!shiftPrice) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Price for the selected shift not found",
          });
      }

      const payment = new Payment({
        registrationId: savedRegistration._id,
        amount: shiftPrice.price,
        paymentType: "One-time",
        paymentStatus: "Completed",
      });

      await payment.save();
    } else if (duration) {
      const durationKey = duration.replace(" ", "_").toLowerCase(); // e.g., '1_month'
      const monthlyPrice =
        course.pricing.long_duration.price_per_month[durationKey];
      const durationMonths = parseInt(duration); // Assuming duration is '1 Month', '2 Months', etc.

      for (let i = 0; i < durationMonths; i++) {
        const payment = new Payment({
          registrationId: savedRegistration._id,
          amount: monthlyPrice,
          paymentType: "Monthly",
          paymentStatus: "Pending",
          paymentDate: new Date(startDate).setMonth(new Date(startDate).getMonth() + i),
        });
        await payment.save();
      }
    }

    res
      .status(201)
      .json({
        success: true,
        data: savedRegistration,
        message: `Student registered successfully ${duration ? duration : "one time"} class.`,
      });
  } catch (error) {
    next(error);
  }
};

// Get a registration by ID
const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate("studentId")
      .populate("courseId")
      .populate("shiftId");
    if (!registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }
    res.json({ success: true, data: registration });
  } catch (error) {
    next(error);
  }
};

// Get all registrations
const getAllRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find()
      .populate("studentId")
      .populate("courseId")
      .populate("shiftId");
    res.json({ success: true, data: registrations });
  } catch (error) {
    next(error);
  }
};

const deleteRegistration = async (req, res, next) => {
  try {
    const delete_registration = await Registration.findByIdAndDelete(
      req.params.id
    );
    if (!delete_registration) {
      return res
        .status(404)
        .json({ success: false, message: "Registration not found" });
    }
    res.json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerStudent,
  getRegistrationById,
  getAllRegistrations,
  deleteRegistration,
};
