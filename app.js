import express from "express"
import dotenv from "dotenv"

const app = express()
const port = process.env.PORT || 3000
dotenv.config()
// Sample data for students
let students = [
  { id: 1, name: 'Ukah-Nwokejiezi Nzubechukwu', age: 18, email: 'nzube.nwokejiezi001@gmail.com' },
  { id: 2, name: 'Wonderful Esele', age: 22, email: 'wonderfulesele@gmail.com' },
  { id: 3, name: 'Author Blessing', age: 19, email: 'authorblessing2008@gmail.com' }
];

let nextId = Math.max(...students.map(s => s.id), 0) + 1;

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
    return students.splice(index, 1)[0];
}
};
// Routing Layer (The controller)
// READ - Get all students(get /api/students) - Author Blessing 2B


// CREATE - Add a new student (post /api/students) - George Erpha 2B 
app.post('/api/students', (req, res) => {
  const { name, age, email } = req.body;
  const newStudent = {id: nextId++, ...req.body};
  if (!name || !age || !email) return res.status(400).json({ error: 'Name, age and email required'})
  students.push(newStudent);
  res.status(201).json({
     message: 'New student added successfully',
     student: newStudent
  });
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