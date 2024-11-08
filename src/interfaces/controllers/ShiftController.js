const ShiftUseCases = require("../../application/use_cases/shiftUseCases");
const MongooseShiftRepository = require("../../infrastructure/persistence/mongooseRepositories/MongooseShiftRepository");

const shiftRepository = new MongooseShiftRepository();
const shiftUseCases = new ShiftUseCases(shiftRepository);

class ShiftController {
  async createShift(req, res, next) {
    try {
      const shift = await shiftUseCases.createShift(req.body);
      res.status(201).json({ success: true, data: shift });
    } catch (error) {
      next(error);
    }
  }

  async getShiftById(req, res, next) {
    try {
      const shift = await shiftUseCases.getShiftById(req.params.id);
      res.json({ success: true, data: shift });
    } catch (error) {
      next(error);
    }
  }

  async getAllShifts(req, res, next) {
    try {
      const shifts = await shiftUseCases.getAllShifts();
      res.json({ success: true, data: shifts });
    } catch (error) {
      next(error);
    }
  }

  async deleteShift(req, res, next) {
    try {
      await shiftUseCases.deleteShift(req.params.id);
      res.json({ success: true, message: "Shift deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ShiftController();
