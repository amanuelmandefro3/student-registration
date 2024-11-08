const { createContainer, asClass, asValue, asFunction } = require('awilix');
const MongooseStudentRepository = require('../infrastructure/persistence/mongooseRepositories/MongooseStudentRepository');
const MongooseCourseRepository = require('../infrastructure/persistence/mongooseRepositories/MongooseCourseRepository');
const MongooseShiftRepository = require('../infrastructure/persistence/mongooseRepositories/MongooseShiftRepository');
const MongooseRegistrationRepository = require('../infrastructure/persistence/mongooseRepositories/MongooseRegistrationRepository');
const MongoosePaymentRepository = require('../infrastructure/persistence/mongooseRepositories/MongoosePaymentRepository');

const StudentUseCases = require('../application/use_cases/studentUseCases');
const CourseUseCases = require('../application/use_cases/courseUseCases');
const ShiftUseCases = require('../application/use_cases/shiftUseCases');
const RegistrationUseCases = require('../application/use_cases/registrationUseCases');
const PaymentUseCases = require('../application/use_cases/paymentUseCases');

const StudentController = require('../interfaces/controllers/StudentController');
const CourseController = require('../interfaces/controllers/CourseController');
const ShiftController = require('../interfaces/controllers/ShiftController');
const RegistrationController = require('../interfaces/controllers/RegistrationController');
const PaymentController = require('../interfaces/controllers/PaymentController');

const container = createContainer();

// Register Repositories
container.register({
  studentRepository: asClass(MongooseStudentRepository).singleton(),
  courseRepository: asClass(MongooseCourseRepository).singleton(),
  shiftRepository: asClass(MongooseShiftRepository).singleton(),
  registrationRepository: asClass(MongooseRegistrationRepository).singleton(),
  paymentRepository: asClass(MongoosePaymentRepository).singleton(),
});

// Register Use Cases
container.register({
  studentUseCases: asClass(StudentUseCases).singleton(),
  courseUseCases: asClass(CourseUseCases).singleton(),
  shiftUseCases: asClass(ShiftUseCases).singleton(),
  registrationUseCases: asClass(RegistrationUseCases).singleton(),
  paymentUseCases: asClass(PaymentUseCases).singleton(),
});

// Register Controllers
container.register({
  studentController: asClass(StudentController).singleton(),
  courseController: asClass(CourseController).singleton(),
  shiftController: asClass(ShiftController).singleton(),
  registrationController: asClass(RegistrationController).singleton(),
  paymentController: asClass(PaymentController).singleton(),
});

module.exports = container;
