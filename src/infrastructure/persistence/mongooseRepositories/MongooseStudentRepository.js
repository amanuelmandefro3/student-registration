const StudentRepository = require("../../../domain/repositories/StudentRepository");
const StudentModel = require("../mongoose/StudentModel");
const Student = require("../../../domain/entities/Student");

class MongooseStudentRepository extends StudentRepository {
  async create(studentData) {
    const student = await StudentModel.create(studentData);
    return new Student({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      registrationDate: student.registrationDate,
      status: student.status,
    });
  }

  async findById(id) {
    const student = await StudentModel.findById(id);
    if (!student) return null;
    return new Student({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      registrationDate: student.registrationDate,
      status: student.status,
    });
  }

  async findAll() {
    const students = await StudentModel.find();
    return students.map(
      (student) =>
        new Student({
          id: student._id,
          name: student.name,
          email: student.email,
          phoneNumber: student.phoneNumber,
          address: student.address,
          registrationDate: student.registrationDate,
          status: student.status,
        })
    );
  }

  async update(id, studentData) {
    const student = await StudentModel.findByIdAndUpdate(id, studentData, {
      new: true,
    });
    if (!student) return null;
    return new Student({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      registrationDate: student.registrationDate,
      status: student.status,
    });
  }

  async delete(id) {
    const student = await StudentModel.findByIdAndDelete(id);
    if (!student) return null;
    return new Student({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      registrationDate: student.registrationDate,
      status: student.status,
    });
  }

  async findByEmail(email) {
    const student = await StudentModel.findOne({ email });
    if (!student) return null;
    return new Student({
      id: student._id,
      name: student.name,
      email: student.email,
      phoneNumber: student.phoneNumber,
      address: student.address,
      registrationDate: student.registrationDate,
      status: student.status,
    });
  }
}

module.exports = MongooseStudentRepository;
