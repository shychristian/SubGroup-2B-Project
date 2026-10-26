<h1 align="center">🎓 Student CRUD API</h1>

<p align="center">
  A RESTful API for managing student records, built with Node.js and Express.<br>
  Group 2B project
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/API-REST-blue" alt="REST API">
</p>

---

## 📖 About the Project

The **Student CRUD API** lets you **C**reate, **R**ead, **U**pdate and **D**elete student records through simple HTTP requests. The code is split into layers (data, logic and routing), and each team member built one part.

## 📑 Table of Contents

- [Team Roles and Responsibilities](#-team-roles-and-responsibilities)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [API Endpoints](#-api-endpoints)
- [Contributors](#-contributors)

## 👥 Team Roles and Responsibilities

| Role | Member | Responsibility |
| --- | --- | --- |
| **Logic Layer** | Wonderful Esele | Handles validation and business logic, including checking for missing information and handling errors during create, update and delete operations. |
| **Create Operation** | George Erphan | Adds new student records to the system. |
| **Read Operation** | Arthur Blessing | Retrieves and displays the current list of students in JSON format. |
| **Update Operation** | Nebolisa Elsie | Updates existing student records using their unique IDs. |
| **Delete Operation** | Fuseini Musah | Removes student records using their unique IDs. |

## 🛠 Technologies Used

- [Node.js](https://nodejs.org/): JavaScript runtime
- [Express.js](https://expressjs.com/): web framework for the API
- [dotenv](https://www.npmjs.com/package/dotenv): loads environment variables from a `.env` file

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/shychristian/<your-repo-name>.git
```

**2. Navigate to the project directory**

```bash
cd <your-repo-name>
```

**3. Install the dependencies**

```bash
npm install
```

**4. Configure your environment variables**

Create a `.env` file in the project root:

```env
PORT=3000
```

**5. Start the server**

```bash
npm start
```

> 💡 **Tip:** If `nodemon` is installed and added to your `package.json` scripts, you can run the server in development mode with `npm run dev`. It restarts automatically whenever you save a file.

The server runs at `http://localhost:3000` by default.

## 🔌 API Endpoints

Base URL: `/api/students`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/students` | Retrieve all students |
| `POST` | `/api/students` | Create a new student |
| `PUT` | `/api/students/:id` | Update an existing student |
| `DELETE` | `/api/students/:id` | Delete a student |

### Example: Create a student

`POST /api/students`

```json
{
  "name": "Ihebereme Tobe",
  "age": 19,
  "email": "tobe.ihe@gmail.com"
}
```

Returns `201 Created` on success, or `400 Bad Request` if `name`, `age` or `email` is missing.

### Example: Update a student

`PUT /api/students/2`

```json
{
  "age": 23
}
```

Returns `200 OK` with the updated student, or `404 Not Found` if the ID doesn't exist.

### Example: Delete a student

`DELETE /api/students/3`

Returns `200 OK` with the deleted student, or `404 Not Found` if the ID doesn't exist.

## 🤝 Contributors

| Contributor | Role |
| --- | --- |
| **Ukah-Nwokejiezi Nzubechukwu** | Team Leader: set up the environment and repository |
| **Wonderful Esele** | Logic Layer |
| **George Erphan** | Create Operation |
| **Arthur Blessing** | Read Operation |
| **Nebolisa Elsie** | Update Operation |
| **Fuseini Musah** | Delete Operation |
| **Dania Tyson** | README documentation |

---

<p align="center">Built with ❤️ by Group 2B</p>