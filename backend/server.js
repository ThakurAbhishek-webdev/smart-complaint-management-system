// server.js — Main entry point for Smart Complaint Management backend

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const errorMiddleware = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Complaint Routes
app.use('/api/employees', require('./routes/employeeRoutes'));

// AI Routes
app.use('/api/ai', require('./routes/aiRoutes'));

// ================= ROOT ROUTE =================

app.get('/', (req, res) => {
  res.json({
    message: 'Smart Complaint Management API is running!',
  });
});

// ================= ERROR HANDLER =================

app.use(errorMiddleware);

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});