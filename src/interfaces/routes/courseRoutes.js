const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const { validateCourse } = require('../middleware/validationMiddleware');

router.post('/', validateCourse, CourseController.createCourse);
router.get('/:id', CourseController.getCourseById);
router.get('/', CourseController.getAllCourses);
router.put('/:id', validateCourse, CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

module.exports = router;
