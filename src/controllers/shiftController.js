const Shift = require('../models/Shift');

// Create a new shift
const createShift = async (req, res, next) => {
  try {
    const { shiftName } = req.body;

    const shift = new Shift({
      shiftName,
    });

    const savedShift = await shift.save();
    res.status(201).json({ success: true, data: savedShift });
  } catch (error) {
    next(error);
  }
};

// Get a shift by ID
const getShiftById = async (req, res, next) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) {
      return res.status(404).json({ success: false, message: 'Shift not found' });
    }
    res.json({ success: true, data: shift });
  } catch (error) {
    next(error);
  }
};

// Get all shifts
const getAllShifts = async (req, res, next) => {
  try {
    const shifts = await Shift.find();
    res.json({ success: true, data: shifts });
  } catch (error) {
    next(error);
  }
};

// Delete a shift
const deleteShift = async (req, res, next) => {
  try {
    const deletedShift = await Shift.findByIdAndDelete(req.params.id);
    if (!deletedShift) {
      return res.status(404).json({ success: false, message: 'Shift not found' });
    }
    res.json({ success: true, message: 'Shift deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShift,
  getShiftById,
  getAllShifts,
  deleteShift,
};
