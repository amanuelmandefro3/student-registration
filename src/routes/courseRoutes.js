const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { validateCourse } = require('../middlewares/validationMiddleware');

router.post('/', validateCourse, courseController.createCourse);
router.get('/:id', courseController.getCourseById);
router.get('/', courseController.getAllCourses);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
