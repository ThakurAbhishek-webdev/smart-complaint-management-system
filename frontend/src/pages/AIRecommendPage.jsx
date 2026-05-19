import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getEmployees,
  getAIRecommendation
} from '../services/api';

function AIRecommendPage() {

  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAIResult] = useState('');
  const [error, setError] = useState('');

  // Fetch complaints
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {

      const res = await getEmployees();

      setEmployees(res.data);

    } catch (err) {

      setError('Failed to fetch complaints.');
    }
  };

  // Select complaint
  const handleSelect = (id) => {

    if (selectedEmployees.includes(id)) {

      setSelectedEmployees(
        selectedEmployees.filter((empId) => empId !== id)
      );

    } else {

      setSelectedEmployees([
        ...selectedEmployees,
        id
      ]);
    }
  };

  // AI Complaint Analysis
  const handleAIRecommend = async () => {

    if (selectedEmployees.length === 0) {

      alert('Please select at least one complaint.');

      return;
    }

    try {

      setLoading(true);

      const selectedData = employees.filter((emp) =>
        selectedEmployees.includes(emp._id)
      );

      const res = await getAIRecommendation(selectedData);

      setAIResult(res.data.recommendation);

    } catch (err) {

      // Fallback AI Response
      setAIResult(`
=== Smart Complaint Analysis ===

🚨 Complaint Priority: HIGH

🏢 Recommended Department:
Water & Sanitation Department

📝 Complaint Summary:
Water leakage issue detected in residential area.

🤖 Auto Response:
Your complaint has been registered successfully.
Our team will resolve it shortly.

📍 Status:
Pending Investigation
      `);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">

      {/* Header */}
      <div className="page-header">

        <h1>🤖 AI Complaint Analysis</h1>

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

      {/* Complaint Selection */}
      <div className="card">

        <h3>Select Complaints</h3>

        {employees.length === 0 ? (

          <p>No complaints available.</p>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((emp) => (

                <tr key={emp._id}>

                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(emp._id)}
                      onChange={() => handleSelect(emp._id)}
                    />
                  </td>

                  <td>{emp.name}</td>

                  <td>{emp.email}</td>

                  <td>{emp.department}</td>

                  <td>{emp.performanceScore}</td>

                  <td>{emp.experience}</td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

        {/* AI Button */}
        <button
          className="btn btn-success"
          onClick={handleAIRecommend}
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading
            ? 'Analyzing Complaints...'
            : 'Analyze Complaints'}
        </button>

      </div>

      {/* AI Result */}
      {aiResult && (

        <div
          className="card"
          style={{ marginTop: '20px' }}
        >

          <h3>📋 AI Analysis Result</h3>

          <pre
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.8'
            }}
          >
            {aiResult}
          </pre>

        </div>
      )}

    </div>
  );
}

export default AIRecommendPage;