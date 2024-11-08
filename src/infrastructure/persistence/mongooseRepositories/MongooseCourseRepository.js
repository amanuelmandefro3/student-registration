const CourseRepository = require("../../../domain/repositories/CourseRepository");
const CourseModel = require("../mongoose/CourseModel");
const Course = require("../../../domain/entities/Course");

class MongooseCourseRepository extends CourseRepository {
  async create(courseData) {
    const course = await CourseModel.create(courseData);
    return new Course({
      id: course._id,
      name: course.name,
      description: course.description,
      type: course.type,
      pricing: course.pricing,
      createdAt: course.createdAt,
    });
  }

  async findById(id) {
    const course = await CourseModel.findById(id).populate(
      "pricing.one_time.shift_prices.shift_id"
    );
    if (!course) return null;
    return new Course({
      id: course._id,
      name: course.name,
      description: course.description,
      type: course.type,
      pricing: course.pricing,
      createdAt: course.createdAt,
    });
  }

  async findAll() {
    const courses = await CourseModel.find().populate(
      "pricing.one_time.shift_prices.shift_id"
    );
    return courses.map(
      (course) =>
        new Course({
          id: course._id,
          name: course.name,
          description: course.description,
          type: course.type,
          pricing: course.pricing,
          createdAt: course.createdAt,
        })
    );
  }

  async update(id, courseData) {
    const course = await CourseModel.findByIdAndUpdate(id, courseData, {
      new: true,
    }).populate("pricing.one_time.shift_prices.shift_id");
    if (!course) return null;
    return new Course({
      id: course._id,
      name: course.name,
      description: course.description,
      type: course.type,
      pricing: course.pricing,
      createdAt: course.createdAt,
    });
  }

  async delete(id) {
    const course = await CourseModel.findByIdAndDelete(id);
    if (!course) return null;
    return new Course({
      id: course._id,
      name: course.name,
      description: course.description,
      type: course.type,
      pricing: course.pricing,
      createdAt: course.createdAt,
    });
  }
}

module.exports = MongooseCourseRepository;
