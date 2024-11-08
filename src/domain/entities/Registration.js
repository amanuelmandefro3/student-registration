class Registration {
  constructor({
    id,
    studentId,
    courseId,
    registrationDate,
    startDate,
    status,
    shiftId,
    duration,
  }) {
    this.id = id;
    this.studentId = studentId;
    this.courseId = courseId;
    this.registrationDate = registrationDate;
    this.startDate = startDate;
    this.status = status;
    this.shiftId = shiftId;
    this.duration = duration;
  }
}

module.exports = Registration;
