const Student = require('../models/Student');

// GET /students - Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST /students
exports.createStudent = async (req, res) => {
try {
const { name, email, phone, course, status } = req.body;

if (!name || !email || !phone || !course) {
return res.status(400).json({ message: 'All fields are required' });
}

const emailExists = await Student.findOne({ email });
if (emailExists) {
return res.status(400).json({ message: 'Email already exists' });
}

const student = await Student.create({
name,
email,
phone,
course,
status
});

res.status(201).json(student);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

//PUT /students/:id
exports.updateStudent = async (req, res) => {
try {
const student = await Student.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);

if (!student) {
return res.status(404).json({ message: 'Student not found' });
}

res.status(200).json(student);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

//Delete /students/:id
exports.deleteStudent = async (req, res) => {
try {
const student = await Student.findByIdAndDelete(req.params.id);


if (!student) {
return res.status(404).json({ message: 'Student not found' });
}


res.status(200).json({ message: 'Student deleted successfully' });
} catch (error) {
res.status(500).json({ message: error.message });
}
};