const RegistrationUseCases = require('../../application/use_cases/registrationUseCases');
const MongooseRegistrationRepository = require('../../infrastructure/persistence/mongooseRepositories/MongooseRegistrationRepository');
const MongooseCourseRepository = require('../../infrastructure/persistence/mongooseRepositories/MongooseCourseRepository');
const MongooseShiftRepository = require('../../infrastructure/persistence/mongooseRepositories/MongooseShiftRepository');
const MongoosePaymentRepository = require('../../infrastructure/persistence/mongooseRepositories/MongoosePaymentRepository');

const registrationRepo = new MongooseRegistrationRepository();
const courseRepo = new MongooseCourseRepository();
const shiftRepo = new MongooseShiftRepository();
const paymentRepo = new MongoosePaymentRepository();
const registrationUseCases = new RegistrationUseCases(registrationRepo, courseRepo, shiftRepo, paymentRepo);

class RegistrationController {
  async register(req, res, next) {
    try {
      const registration = await registrationUseCases.registerStudent(req.body);
      res.status(201).json({ success: true, data: registration });
    } catch (error) {
      next(error);
    }
  }

  async getRegistrationById(req, res, next) {
    try {
      const registration = await registrationUseCases.getRegistrationById(req.params.id);
      res.json({ success: true, data: registration });
    } catch (error) {
      next(error);
    }
  }

  async getAllRegistrations(req, res, next) {
    try {
      const registrations = await registrationUseCases.getAllRegistrations();
      res.json({ success: true, data: registrations });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RegistrationController();
