const ShiftRepository = require("../../../domain/repositories/ShiftRepository");
const ShiftModel = require("../mongoose/ShiftModel");
const Shift = require("../../../domain/entities/Shift");

class MongooseShiftRepository extends ShiftRepository {
  async create(shiftData) {
    const shift = await ShiftModel.create(shiftData);
    return new Shift({
      id: shift._id,
      shiftName: shift.shiftName,
      createdAt: shift.createdAt,
    });
  }

  async findById(id) {
    const shift = await ShiftModel.findById(id);
    if (!shift) return null;
    return new Shift({
      id: shift._id,
      shiftName: shift.shiftName,
      createdAt: shift.createdAt,
    });
  }

  async findAll() {
    const shifts = await ShiftModel.find();
    return shifts.map(
      (shift) =>
        new Shift({
          id: shift._id,
          shiftName: shift.shiftName,
          createdAt: shift.createdAt,
        })
    );
  }

  async delete(id) {
    const shift = await ShiftModel.findByIdAndDelete(id);
    if (!shift) return null;
    return new Shift({
      id: shift._id,
      shiftName: shift.shiftName,
      createdAt: shift.createdAt,
    });
  }
}

module.exports = MongooseShiftRepository;
