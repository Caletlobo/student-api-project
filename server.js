const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend/public'));

// In-memory student database
let students = [
  { id: 1, name: "Aarav Sharma",   branch: "Computer Science", year: 2 },
  { id: 2, name: "Priya Mehta",    branch: "Electronics",      year: 3 },
  { id: 3, name: "Rohan Patil",    branch: "Mechanical",       year: 1 },
  { id: 4, name: "Sneha Kulkarni", branch: "Civil",            year: 4 },
  { id: 5, name: "Dev Joshi",      branch: "Information Tech", year: 2 },
];
let nextId = 6;

// ─────────────────────────────────────────────
//  GET /students  →  Get all students
// ─────────────────────────────────────────────
app.get('/students', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// ─────────────────────────────────────────────
//  GET /students/:id  →  Get a specific student
// ─────────────────────────────────────────────
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  res.status(200).json({ success: true, data: student });
});

// ─────────────────────────────────────────────
//  POST /students  →  Add a new student
// ─────────────────────────────────────────────
app.post('/students', (req, res) => {
  const { name, branch, year } = req.body;

  if (!name || !branch || !year) {
    return res.status(400).json({
      success: false,
      message: 'All fields required: name, branch, year'
    });
  }

  const newStudent = { id: nextId++, name, branch, year: parseInt(year) };
  students.push(newStudent);

  res.status(201).json({ success: true, message: 'Student added successfully', data: newStudent });
});

// ─────────────────────────────────────────────
//  PATCH /students/:id  →  Update student details
// ─────────────────────────────────────────────
app.patch('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  const { name, branch, year } = req.body;
  if (name)   students[index].name   = name;
  if (branch) students[index].branch = branch;
  if (year)   students[index].year   = parseInt(year);

  res.status(200).json({ success: true, message: 'Student updated successfully', data: students[index] });
});

// ─────────────────────────────────────────────
//  DELETE /students/:id  →  Delete a student
// ─────────────────────────────────────────────
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Student with ID ${id} not found` });
  }

  const deleted = students.splice(index, 1)[0];
  res.status(200).json({ success: true, message: 'Student deleted successfully', data: deleted });
});

// ─────────────────────────────────────────────
//  404 handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`\n🎓 Student Records API is running!`);
  console.log(`   Server  → http://localhost:${PORT}`);
  console.log(`   API     → http://localhost:${PORT}/students`);
  console.log(`   GUI     → http://localhost:${PORT}\n`);
});
