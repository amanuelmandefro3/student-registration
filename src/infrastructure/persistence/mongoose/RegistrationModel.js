const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Cancelled"],
    default: "Active",
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    default: null,
  },
  duration: {
    type: String,
    enum: ["1 Month", "2 Months", "3 Months", "6 Months"],
    default: null,
  },
});

registrationSchema.pre("save", function (next) {
  if ((this.shiftId && this.duration) || (!this.shiftId && !this.duration)) {
    return next(
      new Error(
        "Registration must have either shiftId or duration, but not both or neither."
      )
    );
  }
  next();
});

const RegistrationModel = mongoose.model("Registration", registrationSchema);

module.exports = RegistrationModel;
