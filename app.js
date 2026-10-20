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


// UPDATE - Update an existing student (put /api/students/:id) - Nebolisa Elsie 2B


// DELETE - Remove a student (delete /api/students/:id) - Fuseini Musah 2B



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})