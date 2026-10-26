import service from "./src/services/studentService";

function tryIt(label, fn) {
  try {
    console.log(label, "->", fn());
  } catch (err) {
    console.log(label, "-> ERROR:", err);
  }
}

tryIt("create ok", () =>
  service.createStudent({ name: "Ada", email: "ada@mail.com", age: 20, course: "CS" })
);
tryIt("create missing fields", () => service.createStudent({ name: "Bob" }));
tryIt("create duplicate email", () =>
  service.createStudent({ name: "Ada2", email: "ada@mail.com", age: 21, course: "CS" })
);
tryIt("list", () => service.listStudents());
tryIt("get 1", () => service.getStudent(1));
tryIt("get 99", () => service.getStudent(99));
tryIt("update ok", () => service.updateStudent(1, { age: 22 }));
tryIt("update empty name", () => service.updateStudent(1, { name: "" }));
tryIt("update nothing", () => service.updateStudent(1, {}));
tryIt("delete 1", () => service.deleteStudent(1));
tryIt("delete 1 again", () => service.deleteStudent(1));