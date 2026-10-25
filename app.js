// Load environment variables from .env file- Nzubechukwu 2B
require('dotenv').config()
const express = require('express');
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // Middleware to parse JSON request bodies

// DATA LAYER- Nzubechukwu 2B

// Sample data for students - Nzubechukwu 2B
let students = [
  { id: 1, name: 'Ukah-Nwokejiezi Nzubechukwu', age: 18, email: 'nzube.nwokejiezi001@gmail.com' },
  { id: 2, name: 'Wonderful Esele', age: 22, email: 'wonderfulesele@gmail.com' },
  { id: 3, name: 'Author Blessing', age: 19, email: 'authorblessing2008@gmail.com' }
];

const studentRepository = {
    getAll: () => students,
    add: (student) => { students.push(student); return student; },
    update: (id, updatedData) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return null;
        students[index] = { ...students[index], ...updatedData };
        return students[index];
    },
    remove: (id) => {
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return null;
        return students.splice(index, 1);
    }
};

// Logic Layer(The service) - Wonderful Esele 2B


// Routing Layer (The controller)
// READ - Get all students(get /api/students) - Author Blessing 2B


// CREATE - Add a new student (post /api/students) - George Erpah 2B 
app.post('/api/students', (req, res) => {
  const {name} = req.body;
  const {age} = req.body;
  const {email} = req.body;
  const newStudent = {id: students.length +1, ...req.body};
  if (!name || !age || !email) return res.status(400).json({ error: 'Name, age and email required'})
  students.push(newStudent);
  res.status(201).json({ message: 'New student added successfully'});
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})