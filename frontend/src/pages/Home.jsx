import React from 'react';
import '../App.css';

// Home Component: The landing page where users select their role (User or Admin).
export default function Home({ onSelectRole }) {

  // Handles the Admin login process using a simple access code.
  const handleAdmin = () => {
    // Prompt the user for the admin password
    const code = window.prompt('Enter admin access code:');
    
    // Check if the code is correct (Current code: 1234)
    if (code === '1234') {
      // Set admin flag in sessionStorage for route protection
      window.sessionStorage.setItem('isAdmin', 'true');
      
      // Store a mock JWT token for API authentication/demonstration purposes
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRhNTMzOGI2Mzk2M2E0YjY4MGRhZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODY5NTY2MiwiZXhwIjoxODEwMjMxNjYyfQ.YK0C9Ls_Nyd4Nxwu-BVUic55t1V2PxoHWORL4KAAQCw');
      
      // Navigate to the admin view
      onSelectRole('admin');
    } else {
      // Deny access if the code is incorrect
      alert('Wrong code. Access denied.');
    }
  };

  return (
    <div className="card role-card" style={{ width: 540 }}>
      {/* Welcome Header */}
      <h1 style={{ marginBottom: 6 }}>Welcome</h1>
      
      {/* System Subtitle */}
      <p style={{ marginTop: 0, color: '#4b2b83' }}>
        AI-Powered Learning System — Select a role to get started
      </p>
      
      {/* Role Selection Buttons */}
      <div style={{ marginTop: 18, display: 'flex', gap: 14, justifyContent: 'center' }}>
        <button className="role-btn" onClick={() => onSelectRole('user')}>
          Log in as User
        </button>
        
        <button className="role-btn role-btn-outline" onClick={handleAdmin}>
          Log in as Admin
        </button>
      </div>
    </div>
  );
}