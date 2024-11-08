const StudentUseCases = require("../../application/use_cases/studentUseCases");
const MongooseStudentRepository = require("../../infrastructure/persistence/mongooseRepositories/MongooseStudentRepository");

const studentRepository = new MongooseStudentRepository();
const studentUseCases = new StudentUseCases(studentRepository);

class StudentController {
  async createStudent(req, res, next) {
    try {
      const student = await studentUseCases.createStudent(req.body);
      res.status(201).json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async getStudentById(req, res, next) {
    try {
      const student = await studentUseCases.getStudentById(req.params.id);
      res.json({ success: true, data: student });
    } catch (error) {
      next(error);
    }
  }

  async getAllStudents(req, res, next) {
    try {
      const students = await studentUseCases.getAllStudents();
      res.json({ success: true, data: students });
    } catch (error) {
      next(error);
    }
  }

  async updateStudent(req, res, next) {
    try {
      const updatedStudent = await studentUseCases.updateStudent(
        req.params.id,
        req.body
      );
      res.json({ success: true, data: updatedStudent });
    } catch (error) {
      next(error);
    }
  }

  async deleteStudent(req, res, next) {
    try {
      await studentUseCases.deleteStudent(req.params.id);
      res.json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
