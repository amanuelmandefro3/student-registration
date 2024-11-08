class Course {
  constructor({ id, name, description, type, pricing, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.pricing = pricing;
    this.createdAt = createdAt;
  }
}

module.exports = Course;
