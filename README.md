# Smart Complaint Management System 🚀

A full-stack MERN application for managing and analyzing public complaints efficiently.

Built using:
- React.js
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- AI-based Complaint Analysis

---

# 🛠 Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js

## Database
- MongoDB Atlas
- Mongoose

## Authentication
- JWT
- bcrypt.js

## AI Integration
- OpenRouter API
- Rule-based fallback analysis

---

# 📁 Project Structure

```bash
smart-complaint-management-system/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   └── aiController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── Employee.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── _redirects
    │
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   │
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── EmployeeListPage.jsx
    │   │   ├── AddEmployeePage.jsx
    │   │   ├── EditEmployeePage.jsx
    │   │   └── AIRecommendPage.jsx
    │   │
    │   ├── services/
    │   │   └── api.js
    │   │
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    │
    └── package.json
