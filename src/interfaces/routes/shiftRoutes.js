const express = require('express');
const router = express.Router();
const ShiftController = require('../controllers/ShiftController');
const { validateShift } = require('../middleware/validationMiddleware');

router.post('/', validateShift, ShiftController.createShift);
router.get('/:id', ShiftController.getShiftById);
router.get('/', ShiftController.getAllShifts);
router.delete('/:id', ShiftController.deleteShift);

module.exports = router;
