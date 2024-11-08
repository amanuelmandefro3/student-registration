const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const { validateStudent } = require("../middleware/validationMiddleware");

router.post("/", validateStudent, StudentController.createStudent);
router.get("/:id", StudentController.getStudentById);
router.get("/", StudentController.getAllStudents);
router.put("/:id", validateStudent, StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);

module.exports = router;
