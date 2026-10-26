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

app.get('/students', (req, res) => {
  res.status(200).json(students) // Send the list of students as JSON response
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})