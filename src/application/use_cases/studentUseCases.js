const Student = require("../../domain/entities/Student");
const StudentRepository = require("../../domain/repositories/StudentRepository");

class StudentUseCases {
  constructor(studentRepository) {
    this.studentRepo = studentRepository;
  }

  async createStudent(data) {
    // Business rules can be added here (e.g., validate email uniqueness)
    const existingStudent = await this.studentRepo.findByEmail(data.email);
    if (existingStudent) {
      throw new Error("Email already exists");
    }
    const student = new Student({
      id: null, // Will be set by repository
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      registrationDate: data.registrationDate || new Date(),
      status: data.status || "Active",
    });
    return await this.studentRepo.create(student);
  }

  async getStudentById(id) {
    const student = await this.studentRepo.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  async getAllStudents() {
    return await this.studentRepo.findAll();
  }

  async updateStudent(id, data) {
    const updatedStudent = await this.studentRepo.update(id, data);
    if (!updatedStudent) {
      throw new Error("Student not found");
    }
    return updatedStudent;
  }

  async deleteStudent(id) {
    const deletedStudent = await this.studentRepo.delete(id);
    if (!deletedStudent) {
      throw new Error("Student not found");
    }
    return deletedStudent;
  }
}

module.exports = StudentUseCases;
