import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getEmployees, updateEmployee } from '../services/api';

function EditEmployeePage() {

  const { id } = useParams();

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
  const [loading, setLoading] = useState(true);

  // Load Complaint Data
  useEffect(() => {

    fetchComplaint();

  }, []);

  const fetchComplaint = async () => {

    try {

      const response = await getEmployees();

      const complaints = response.data;

      const complaint = complaints.find(
        (item) => item._id === id
      );

      if (!complaint) {

        setError('Complaint not found');
        return;
      }

      setFormData({
        name: complaint.name || '',
        email: complaint.email || '',
        department: complaint.department || '',
        skills: complaint.skills?.join(', ') || '',
        performanceScore: complaint.performanceScore || '',
        experience: complaint.experience || '',
      });

    } catch (err) {

      console.log(err);

      setError('Failed to load complaint');

    } finally {

      setLoading(false);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Complaint
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError('');

      await updateEmployee(id, {

        ...formData,

        skills: formData.skills
          .split(',')
          .map((item) => item.trim()),

        performanceScore: Number(formData.performanceScore),

        experience: formData.experience,

      });

      navigate('/employees');

    } catch (err) {

      console.log(err);

      setError('Failed to update complaint');

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="loading">
        Loading complaint...
      </div>
    );
  }

  return (
    <div className="page-wrapper">

      {/* Header */}
      <div className="page-header">

        <h1>✏️ Edit Complaint</h1>

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

          <div className="form-grid">

            {/* Name */}
            <div className="form-group">

              <label>Complainant Name *</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* Email */}
            <div className="form-group">

              <label>Email Address *</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* Category */}
            <div className="form-group">

              <label>Complaint Category *</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">
                  -- Select Category --
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

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />

            </div>

            {/* Priority */}
            <div className="form-group">

              <label>Complaint Priority *</label>

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

              <label>Location *</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Complaint
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditEmployeePage;