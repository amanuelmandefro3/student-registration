class Student {
  constructor({
    id,
    name,
    email,
    phoneNumber,
    address,
    registrationDate,
    status,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.registrationDate = registrationDate;
    this.status = status;
  }
}

module.exports = Student;
