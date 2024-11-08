const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  shiftName: {
    type: String,
    enum: ["Morning", "Afternoon", "Night", "Full Day"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ShiftModel = mongoose.model("Shift", shiftSchema);

module.exports = ShiftModel;
