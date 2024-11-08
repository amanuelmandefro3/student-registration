const Student = require("../models/Student");

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber, address, status } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists1" });
    }

    const student = new Student({
      name,
      email,
      phoneNumber,
      address,
      status: status || "Active",
    });

    const savedStudent = await student.save();
    res.status(201).json({ success: true, data: savedStudent });
    console.log("Successful created!");
    return;
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    next(error);
  }
};

// Get all students
const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (error) {
    next(error);
  }
};

// Update a student
// const updateStudent = async (req, res, next) => {
//   try {
//     const { name, email, phoneNumber, address, status } = req.body;

//     if (email) {
//       const existingStudent = await Student.findOne({
//         email,
//         _id: { $ne: req.params.id },
//       });
//       if (existingStudent) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Email already exists" });
//       }
//     }

//     const user = await Student.findById(req.params.id);

//     const updatedStudent = await Student.findByIdAndUpdate(
//       req.params.id,
//       {
//         name: name || user.name,
//         email: email || user.email,
//         phoneNumber: phoneNumber || user.phoneNumber,
//         address: address || user.address,
//         status: status || user.status,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedStudent) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Student not found" });
//     }

//     res.json({ success: true, data: updatedStudent });
//   } catch (error) {
//     next(error);
//   }
// };
const updateStudent = async (req, res, next) => {

  try {

    const student = await Student.findById(req.params.id);
    if(!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    const updateFields = student;
    console.log('Here', updateFields);

    // Add fields to updateFields object only if they are provided in the request body
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.email) {
      const existingStudent = await Student.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });
      if (existingStudent) {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
      updateFields.email = req.body.email;
    }
    if (req.body.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
    if (req.body.address) updateFields.address = req.body.address;
    if (req.body.status) updateFields.status = req.body.status;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    next(error);
  }
};

// Delete a student
const deleteStudent = async (req, res, next) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
