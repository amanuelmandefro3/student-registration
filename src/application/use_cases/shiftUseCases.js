const Shift = require("../../domain/entities/Shift");
const ShiftRepository = require("../../domain/repositories/ShiftRepository");

class ShiftUseCases {
  constructor(shiftRepository) {
    this.shiftRepo = shiftRepository;
  }

  async createShift(data) {
    const shift = new Shift({
      id: null,
      shiftName: data.shiftName,
      createdAt: data.createdAt || new Date(),
    });
    return await this.shiftRepo.create(shift);
  }

  async getShiftById(id) {
    const shift = await this.shiftRepo.findById(id);
    if (!shift) {
      throw new Error("Shift not found");
    }
    return shift;
  }

  async getAllShifts() {
    return await this.shiftRepo.findAll();
  }

  async deleteShift(id) {
    const deletedShift = await this.shiftRepo.delete(id);
    if (!deletedShift) {
      throw new Error("Shift not found");
    }
    return deletedShift;
  }
}

module.exports = ShiftUseCases;
