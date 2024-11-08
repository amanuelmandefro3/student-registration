const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res, next) => {
  try {
    const { name, description, type, pricing } = req.body;

    const course = new Course({
      name,
      description,
      type,
      pricing,
    });

    const savedCourse = await course.save();
    res.status(201).json({ success: true, data: savedCourse });
  } catch (error) {
    next(error);
  }
};

// Get a course by ID
const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('pricing.one_time.shift_prices.shift_id');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

// Get all courses
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('pricing.one_time.shift_prices.shift_id');
    res.json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

// Update a course
const updateCourse = async (req, res, next) => {
  try {
    const { name, description, type, pricing } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    const updateName = req.body.name || course.name;
    const updateDescription = req.body.description || course.description;
    const updateType = req.body.type || course.type;
    const updatePricing = req.body.pricing || course.pricing

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name:updateName, description:updateDescription, type:updateType, pricing:updatePricing},
      { new: true, runValidators: true }
    ).populate('pricing.one_time.shift_prices.shift_id');



    res.json({ success: true, data: updatedCourse });
  } catch (error) {
    next(error);
  }
};

// Delete a course
const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse,
};
