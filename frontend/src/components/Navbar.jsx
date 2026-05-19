import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/complaints" className="brand">
        🛠️ Smart Complaint Management System
      </Link>

      <nav>
        {user ? (
          <>
            <Link to="/complaints">Complaints</Link>

            <Link to="/complaints/add">
              Add Complaint
            </Link>

            <Link to="/ai-recommend">
              AI Analyze
            </Link>

            <span
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem'
              }}
            >
              👤 {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;