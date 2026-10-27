require('dotenv').config()
const express = require('express');
const { createStudent } = require('./src/services/studentService');
const app = express()
const PORT = process.env.PORT || 5001


app.use(express.json())
// Sample data for students
let students = [
  { id: 1, name: 'Ukah-Nwokejiezi Nzubechukwu', age: 18, email: 'nzube.nwokejiezi001@gmail.com' },
  { id: 2, name: 'Wonderful Esele', age: 22, email: 'wonderfulesele@gmail.com' },
  { id: 3, name: 'Author Blessing', age: 19, email: 'authorblessing2008@gmail.com' }
];

let nextId = Math.max(...students.map(s => s.id), 0) + 1;

const studentRepository = {
    getAll: () => students,
    getByEmail: (email) => students.find(student => student.email === email),
    add: (student) => {
      const newStudent = { id: nextId++, ...student };
      students.push(newStudent);
      return newStudent;
    },
    update: (id, updatedData) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return null;
        students[index] = { ...students[index], ...updatedData };
        return students[index];
    },
   remove: (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    return students.splice(index, 1)[0];
}
};
// Routing Layer (The controller)

// READ - Get all students (GET /api/students) - Arthur Blessing 2B
app.get('/api/students', (req, res) => {
    const students = studentRepository.getAll();

    return res.status(200).json({
        message: 'Students retrieved successfully',
        students: students
    });
});

// READ - Get a student by ID (GET /api/students/:id) - Ukah-Nwokejiezi Nzubechukwu 2B
app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = studentRepository.getAll().find(s => s.id === id);
    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }
     return res.status(200).json({
        message: 'Student retrieved successfully',
        student: student
    });
});

 // CREATE - Add a new student (post /api/students) - George Erpha 2B 
app.post('/api/students', (req, res) => {
  try {
    const newStudent = createStudent(req.body, studentRepository);

    return res.status(201).json({
      message: 'New student added successfully',
      student: newStudent
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      error: error.message || 'Failed to add student'
    });
  }
});

// UPDATE - Update an existing student (put /api/students/:id) - Nebolisa Elsie 2B

app.put('/api/students/:id', (req, res) => {
const id = Number(req.params.id);
const updatedData = req.body;

// Prevent any form of changes to the student ID
const { id: ignoredId, ...studentUpdates } = updatedData;

// Update the student using the existing repository

const updatedStudent = studentRepository.update(
  id,
  studentUpdates
  );

  // Check if the student exists
if (!updatedStudent) {
  return res.status(404).json({
  message: 'Student not found'
  });
  }

  // Return the updated student
return res.status(200).json({
  message: 'Student updated successfully',
  student: updatedStudent
  });
});



// DELETE - Remove a student (delete /api/students/:id) - Fuseini Musah 2B

app.delete('/api/students/:id', (req, res) => {
  const id = Number(req.params.id);

  const deletedStudent = studentRepository.remove(id);

  if (!deletedStudent) {
    return res.status(404).json({
      message: 'Student not found'
    });
  }

  return res.status(200).json({
    message: 'Student deleted successfully',
    student: deletedStudent
  });
});



app.listen(PORT, () => {
  console.log(`Student Record API running on port ${PORT} :)`)
});
