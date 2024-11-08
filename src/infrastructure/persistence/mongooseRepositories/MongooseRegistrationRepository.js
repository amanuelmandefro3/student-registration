const RegistrationRepository = require("../../../domain/repositories/RegistrationRepository");
const RegistrationModel = require("../mongoose/RegistrationModel");
const Registration = require("../../../domain/entities/Registration");

class MongooseRegistrationRepository extends RegistrationRepository {
  async create(registrationData) {
    const registration = await RegistrationModel.create(registrationData);
    return new Registration({
      id: registration._id,
      studentId: registration.studentId,
      courseId: registration.courseId,
      registrationDate: registration.registrationDate,
      startDate: registration.startDate,
      status: registration.status,
      shiftId: registration.shiftId,
      duration: registration.duration,
    });
  }

  async findById(id) {
    const registration = await RegistrationModel.findById(id)
      .populate("studentId")
      .populate("courseId")
      .populate("shiftId");
    if (!registration) return null;
    return new Registration({
      id: registration._id,
      studentId: registration.studentId,
      courseId: registration.courseId,
      registrationDate: registration.registrationDate,
      startDate: registration.startDate,
      status: registration.status,
      shiftId: registration.shiftId,
      duration: registration.duration,
    });
  }

  async findAll() {
    const registrations = await RegistrationModel.find()
      .populate("studentId")
      .populate("courseId")
      .populate("shiftId");
    return registrations.map(
      (reg) =>
        new Registration({
          id: reg._id,
          studentId: reg.studentId,
          courseId: reg.courseId,
          registrationDate: reg.registrationDate,
          startDate: reg.startDate,
          status: reg.status,
          shiftId: reg.shiftId,
          duration: reg.duration,
        })
    );
  }

  async update(id, registrationData) {
    const reg = await RegistrationModel.findByIdAndUpdate(
      id,
      registrationData,
      { new: true }
    )
      .populate("studentId")
      .populate("courseId")
      .populate("shiftId");
    if (!reg) return null;
    return new Registration({
      id: reg._id,
      studentId: reg.studentId,
      courseId: reg.courseId,
      registrationDate: reg.registrationDate,
      startDate: reg.startDate,
      status: reg.status,
      shiftId: reg.shiftId,
      duration: reg.duration,
    });
  }

  async delete(id) {
    const reg = await RegistrationModel.findByIdAndDelete(id);
    if (!reg) return null;
    return new Registration({
      id: reg._id,
      studentId: reg.studentId,
      courseId: reg.courseId,
      registrationDate: reg.registrationDate,
      startDate: reg.startDate,
      status: reg.status,
      shiftId: reg.shiftId,
      duration: reg.duration,
    });
  }
}

module.exports = MongooseRegistrationRepository;
