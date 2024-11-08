const Course = require("../../domain/entities/Course");
const CourseRepository = require("../../domain/repositories/CourseRepository");

class CourseUseCases {
  constructor(courseRepository) {
    this.courseRepo = courseRepository;
  }

  async createCourse(data) {
    // Business rules can be added here (e.g., validate pricing structure)
    const course = new Course({
      id: null,
      name: data.name,
      description: data.description,
      type: data.type,
      pricing: data.pricing,
      createdAt: data.createdAt || new Date(),
    });
    return await this.courseRepo.create(course);
  }

  async getCourseById(id) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }

  async getAllCourses() {
    return await this.courseRepo.findAll();
  }

  async updateCourse(id, data) {
    const updatedCourse = await this.courseRepo.update(id, data);
    if (!updatedCourse) {
      throw new Error("Course not found");
    }
    return updatedCourse;
  }

  async deleteCourse(id) {
    const deletedCourse = await this.courseRepo.delete(id);
    if (!deletedCourse) {
      throw new Error("Course not found");
    }
    return deletedCourse;
  }
}

module.exports = CourseUseCases;
