import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, searchEmployees, deleteEmployee } from '../services/api';

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchDept, setSearchDept] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all complaints
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to fetch complaints. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  // Search complaints by category
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await searchEmployees(searchDept);
      setEmployees(res.data);
    } catch (err) {
      setError('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  // Reset filters
  const handleReset = () => {
    setSearchDept('');
    fetchAllEmployees();
  };

  // Delete complaint
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete complaint from ${name}?`)) return;

    try {
      await deleteEmployee(id);

      setMessage(`Complaint deleted successfully.`);

      setEmployees(employees.filter((emp) => emp._id !== id));

      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete complaint.');
    }
  };

  // Priority badge colors
  const getScoreClass = (score) => {
    if (score >= 80) return 'score-badge score-high';
    if (score >= 60) return 'score-badge score-mid';
    return 'score-badge score-low';
  };

  return (
    <div className="page-wrapper">

      {/* Header */}
      <div className="page-header">
        <h1>🛠️ Complaint List</h1>

        <Link
          to="/employees/add"
          className="btn btn-primary"
        >
          + Add Complaint
        </Link>
      </div>

      {/* Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      {/* Search Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <form className="search-bar" onSubmit={handleSearch}>

          <select
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          >
            <option value="">-- Filter by Category --</option>

            <option>Water Supply</option>
            <option>Electricity</option>
            <option>Road Damage</option>
            <option>Garbage</option>
            <option>Internet</option>
            <option>Sanitation</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary"
          >
            🔍 Search
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>
      </div>

      {/* Complaint Table */}
      <div className="card">

        {loading ? (
          <div className="loading">
            Loading complaints...
          </div>

        ) : employees.length === 0 ? (

          <div className="empty-state">
            <p>No complaints found.</p>

            <Link
              to="/employees/add"
              className="btn btn-primary"
            >
              Register First Complaint
            </Link>
          </div>

        ) : (

          <div className="table-wrapper">

            <p
              style={{
                marginBottom: '12px',
                color: '#64748b',
                fontSize: '0.9rem'
              }}
            >
              Showing {employees.length} complaint
              {employees.length !== 1 ? 's' : ''}
            </p>

            <table>

              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {employees.map((emp, index) => (
                  <tr key={emp._id}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>{emp.name}</strong>
                    </td>

                    <td>{emp.email}</td>

                    <td>{emp.department}</td>

                    <td>
                      {emp.skills && emp.skills.length > 0 ? (
                        emp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="skill-tag"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span
                          style={{
                            color: '#94a3b8',
                            fontSize: '0.85rem'
                          }}
                        >
                          None
                        </span>
                      )}
                    </td>

                    <td>
                      <span className={getScoreClass(emp.performanceScore)}>
                        {emp.performanceScore}
                      </span>
                    </td>

                    <td>{emp.experience}</td>

                    <td>
                      <div className="action-buttons">

                        <Link
                          to={`/employees/edit/${emp._id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(emp._id, emp.name)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}
      </div>

      {/* AI Analysis Button */}
      {employees.length > 0 && (
        <div
          style={{
            marginTop: '16px',
            textAlign: 'right'
          }}
        >
          <Link
            to="/ai-recommend"
            className="btn btn-success"
          >
            🤖 Analyze Complaints
          </Link>
        </div>
      )}

    </div>
  );
}

export default EmployeeListPage;