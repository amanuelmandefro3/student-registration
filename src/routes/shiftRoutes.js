const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const { validateShift } = require('../middlewares/validationMiddleware');


router.post('/', validateShift, shiftController.createShift);
router.get('/:id', shiftController.getShiftById);
router.get('/', shiftController.getAllShifts);
router.delete('/:id', shiftController.deleteShift);

module.exports = router;
