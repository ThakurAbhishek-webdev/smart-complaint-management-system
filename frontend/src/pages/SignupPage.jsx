// src/pages/SignupPage.jsx — User registration form

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

function SignupPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {

      setLoading(true);

      // API Call
      const response = await signup(formData);

      // Save token
      localStorage.setItem(
        'token',
        response.data.token
      );

      // Save user info
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
        })
      );

      // Redirect
      navigate('/employees');

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        'Signup failed. Please try again.'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card">

        <h2>Create Account 🚀</h2>

        <p>
          Sign up to use Smart Complaint Management System
        </p>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              id="signup-name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}
          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              id="signup-email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              id="signup-password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            id="signup-btn"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading
              ? 'Creating account...'
              : 'Sign Up'}
          </button>

        </form>

        {/* Login Link */}
        <p
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '0.9rem',
            color: '#64748b',
          }}
        >
          Already have an account?{' '}

          <Link to="/login">
            Login here
          </Link>

        </p>

      </div>

    </div>
  );
}

export default SignupPage;