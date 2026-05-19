import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addEmployee } from '../services/api';

function AddEmployeePage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit complaint
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError('');

      await addEmployee({

        ...formData,

        // Convert description into array
        skills: [formData.skills],

        // Convert priority into number
        performanceScore: Number(formData.performanceScore),

        // Temporary numeric location
        experience: Number(formData.experience),

      });

      navigate('/employees');

    } catch (err) {

      console.log(err);

      setError('Failed to submit complaint.');

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">

      {/* Header */}
      <div className="page-header">

        <h1>📝 Register Complaint</h1>

        <Link
          to="/employees"
          className="btn btn-secondary"
        >
          ← Back to Complaints
        </Link>

      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="card">

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter complainant name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Category */}
          <div className="form-group">

            <label>Complaint Category</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Category
              </option>

              <option>
                Water Supply
              </option>

              <option>
                Electricity
              </option>

              <option>
                Garbage
              </option>

              <option>
                Road Damage
              </option>

              <option>
                Internet
              </option>

              <option>
                Sanitation
              </option>

            </select>

          </div>

          {/* Description */}
          <div className="form-group">

            <label>Complaint Description</label>

            <textarea
              name="skills"
              placeholder="Describe complaint here..."
              value={formData.skills}
              onChange={handleChange}
              rows="4"
              required
            />

          </div>

          {/* Priority */}
          <div className="form-group">

            <label>Complaint Priority</label>

            <select
              name="performanceScore"
              value={formData.performanceScore}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Priority
              </option>

              <option value="90">
                High
              </option>

              <option value="60">
                Medium
              </option>

              <option value="30">
                Low
              </option>

            </select>

          </div>

          {/* Location */}
          <div className="form-group">

            <label>Location</label>

            <input
              type="number"
              name="experience"
              placeholder="Enter location code"
              value={formData.experience}
              onChange={handleChange}
              required
            />

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? 'Submitting Complaint...'
              : 'Submit Complaint'}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddEmployeePage;