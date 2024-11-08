const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent } = require('../middlewares/validationMiddleware');

// route for create a new student
router.post('/', validateStudent, studentController.createStudent);

// route for get a student by ID
router.get('/:id', studentController.getStudentById);

// route for get all students
router.get('/', studentController.getAllStudents);

// route for update a student
router.put('/:id', studentController.updateStudent);

// route for delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
