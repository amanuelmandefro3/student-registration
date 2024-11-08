const express = require("express");
const router = express.Router();
const RegistrationController = require("../controllers/RegistrationController");
const { validateRegistration } = require("../middleware/validationMiddleware");

router.post("/", validateRegistration, RegistrationController.register);
router.get("/:id", RegistrationController.getRegistrationById);
router.get("/", RegistrationController.getAllRegistrations);

module.exports = router;
