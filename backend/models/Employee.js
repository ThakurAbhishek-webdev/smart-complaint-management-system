const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
{
  // Complaint User Name
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },

  // User Email
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },

  // Complaint Category
  department: {
    type: String,
    required: [true, 'Complaint category is required'],
    trim: true,
  },

  // Complaint Description
  skills: {
    type: [String],
    default: [],
  },

  // Complaint Priority
  performanceScore: {
    type: Number,
    required: [true, 'Priority is required'],
    min: [0, 'Priority cannot be below 0'],
    max: [100, 'Priority cannot be above 100'],
  },

  // Complaint Location
  experience: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },

},
{
  timestamps: true,
}
);

module.exports = mongoose.model('Employee', employeeSchema);