const CourseUseCases = require("../../application/use_cases/courseUseCases");
const MongooseCourseRepository = require("../../infrastructure/persistence/mongooseRepositories/MongooseCourseRepository");

const courseRepository = new MongooseCourseRepository();
const courseUseCases = new CourseUseCases(courseRepository);

class CourseController {
  async createCourse(req, res, next) {
    try {
      const course = await courseUseCases.createCourse(req.body);
      res.status(201).json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const course = await courseUseCases.getCourseById(req.params.id);
      res.json({ success: true, data: course });
    } catch (error) {
      next(error);
    }
  }

  async getAllCourses(req, res, next) {
    try {
      const courses = await courseUseCases.getAllCourses();
      res.json({ success: true, data: courses });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const updatedCourse = await courseUseCases.updateCourse(
        req.params.id,
        req.body
      );
      res.json({ success: true, data: updatedCourse });
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      await courseUseCases.deleteCourse(req.params.id);
      res.json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CourseController();
