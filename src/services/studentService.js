
const data = {
  students: [],
  nextId: 1,

  getAll() {
    return this.students;
  },

  getById(id) {
    return this.students.find((s) => s.id === id);
  },

  getByEmail(email) {
    return this.students.find((s) => s.email === email);
  },

  add(student) {
    const newStudent = { id: this.nextId++, ...student };
    this.students.push(newStudent);
    return newStudent;
  },

  update(id, changes) {
    const student = this.getById(id);
    if (!student) return null;
    Object.assign(student, changes);
    return student;
  },

  remove(id) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    return true;
  },
};

// ---------- Helpers ----------
const FIELDS = ["name", "email", "age"];

function isMissing(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "string" && value.trim() === "")
  );
}

function isValidAge(age) {
  return typeof age === "number" && Number.isFinite(age) && age > 0;
}

// ---------- Logic layer ----------
function createStudent(info = {}, repository = data) {
  const missing = FIELDS.filter((field) => isMissing(info[field]));
  if (missing.length > 0) {
    throw { status: 400, message: `Missing required field(s): ${missing.join(", ")}` };
  }

  if (!isValidAge(info.age)) {
    throw { status: 400, message: "Age must be a number greater than 0" };
  }

  if (repository.getByEmail(info.email)) {
    throw { status: 409, message: "A student with this email already exists" };
  }

  const { name, email, age } = info;
  return repository.add({ name, age, email });
}

function getStudent(id) {
  if (!Number.isInteger(id)) {
    throw { status: 400, message: "Invalid student id" };
  }

  const student = data.getById(id);
  if (!student) {
    throw { status: 404, message: "Student not found" };
  }
  return student;
}

function listStudents() {
  return data.getAll();
}

function updateStudent(id, changes = {}) {
  getStudent(id); // throws 400 or 404 if the id is bad or the student doesn't exist

  const provided = FIELDS.filter((field) => changes[field] !== undefined);
  if (provided.length === 0) {
    throw { status: 400, message: "No update info provided" };
  }

  for (const field of provided) {
    if (isMissing(changes[field])) {
      throw { status: 400, message: `${field} cannot be empty` };
    }
  }

  if (changes.age !== undefined && !isValidAge(changes.age)) {
    throw { status: 400, message: "Age must be a number greater than 0" };
  }

  if (changes.email !== undefined) {
    const other = data.getByEmail(changes.email);
    if (other && other.id !== id) {
      throw { status: 409, message: "Another student already uses this email" };
    }
  }

  const cleanChanges = {};
  for (const field of provided) {
    cleanChanges[field] = changes[field];
  }
  return data.update(id, cleanChanges);
}

function deleteStudent(id) {
  getStudent(id); // throws 400 or 404 if the id is bad or the student doesn't exist
  data.remove(id);
  return { message: "Student deleted successfully" };
}

module.exports = {
  createStudent,
  getStudent,
  listStudents,
  updateStudent,
  deleteStudent,
};