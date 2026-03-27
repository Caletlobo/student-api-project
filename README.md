# 🎓 Student Records REST API

## Project Structure
```
student-api-project/
├── backend/
│   ├── server.js          ← Express API server
│   └── package.json
├── frontend/
│   └── public/
│       └── index.html     ← Professional GUI
├── StudentRecords.postman_collection.json
└── README.md
```

## Quick Start

### Step 1 — Install dependencies
```bash
cd backend
npm install
```

### Step 2 — Start the server
```bash
node server.js
```
Server starts at: **http://localhost:3000**

### Step 3 — Open the GUI
Visit **http://localhost:3000** in your browser.

---

## API Endpoints

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| GET    | /students         | Get all students      |
| GET    | /students/:id     | Get student by ID     |
| POST   | /students         | Add new student       |
| PATCH  | /students/:id     | Update student fields |
| DELETE | /students/:id     | Delete student        |

## POST Body (JSON)
```json
{
  "name": "Rahul Desai",
  "branch": "Computer Science",
  "year": 2
}
```

## Postman
1. Open Postman
2. Import → `StudentRecords.postman_collection.json`
3. Run any request — the base URL is pre-set to `http://localhost:3000`
