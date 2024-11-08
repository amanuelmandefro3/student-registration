const Registration = require("../../domain/entities/Registration");
const RegistrationRepository = require("../../domain/repositories/RegistrationRepository");
const CourseRepository = require("../../domain/repositories/CourseRepository");
const ShiftRepository = require("../../domain/repositories/ShiftRepository");
const PaymentRepository = require("../../domain/repositories/PaymentRepository");
const Payment = require("../../domain/entities/Payment");

class RegistrationUseCases {
  constructor(registrationRepo, courseRepo, shiftRepo, paymentRepo) {
    this.registrationRepo = registrationRepo;
    this.courseRepo = courseRepo;
    this.shiftRepo = shiftRepo;
    this.paymentRepo = paymentRepo;
  }

  async registerStudent(data) {
    const { studentId, courseId, startDate, shiftId, duration } = data;

    // Validate course existence
    const course = await this.courseRepo.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Validate shift or duration based on course type
    if (course.type === "One-time") {
      if (!shiftId) {
        throw new Error("shiftId is required for One-time courses");
      }
      const shift = await this.shiftRepo.findById(shiftId);
      if (!shift) {
        throw new Error("Shift not found");
      }
    } else if (course.type === "Long-duration") {
      if (!duration) {
        throw new Error("duration is required for Long-duration courses");
      }
      const durationKey = duration.replace(" ", "_").toLowerCase(); // e.g., '1_month'
      if (!course.pricing.long_duration.price_per_month[durationKey]) {
        throw new Error("Invalid duration");
      }
    }

    // Create registration
    const registration = new Registration({
      id: null,
      studentId,
      courseId,
      registrationDate: new Date(),
      startDate,
      status: "Active",
      shiftId: course.type === "One-time" ? shiftId : null,
      duration: course.type === "Long-duration" ? duration : null,
    });

    const savedRegistration = await this.registrationRepo.create(registration);

    // Handle payments
    if (course.type === "One-time") {
      const shiftPrice = course.pricing.one_time.shift_prices.find(
        (sp) => sp.shift_id.toString() === shiftId
      );
      if (!shiftPrice) {
        throw new Error("Price for the selected shift not found");
      }

      const payment = new Payment({
        id: null,
        registrationId: savedRegistration.id,
        amount: shiftPrice.price,
        paymentDate: new Date(),
        paymentType: "One-time",
        paymentStatus: "Completed",
      });

      await this.paymentRepo.create(payment);
    } else if (course.type === "Long-duration") {
      const durationKey = duration.replace(" ", "_").toLowerCase();
      const monthlyPrice =
        course.pricing.long_duration.price_per_month[durationKey];
      const durationMonths = parseInt(duration); // Assuming duration is '1 Month', '2 Months', etc.

      for (let i = 0; i < durationMonths; i++) {
        const payment = new Payment({
          id: null,
          registrationId: savedRegistration.id,
          amount: monthlyPrice,
          paymentDate: new Date(),
          paymentType: "Monthly",
          paymentStatus: "Pending",
        });
        await this.paymentRepo.create(payment);
      }
    }

    return savedRegistration;
  }

  async getRegistrationById(id) {
    const registration = await this.registrationRepo.findById(id);
    if (!registration) {
      throw new Error("Registration not found");
    }
    return registration;
  }

  async getAllRegistrations() {
    return await this.registrationRepo.findAll();
  }
}

module.exports = RegistrationUseCases;
