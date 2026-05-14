import React from 'react';
import '../App.css';

export default function Home({ onSelectRole }) {

const handleAdmin = () => {
    const code = window.prompt('Enter admin access code:');
    if (code === '1234') {
      window.sessionStorage.setItem('isAdmin', 'true');
      localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDRhNTMzOGI2Mzk2M2E0YjY4MGRhZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3ODY5NTY2MiwiZXhwIjoxODEwMjMxNjYyfQ.YK0C9Ls_Nyd4Nxwu-BVUic55t1V2PxoHWORL4KAAQCw');
      onSelectRole('admin');
    } else {
      alert('Wrong code. Access denied.');
    }
  };

  return (
    <div className="card role-card" style={{ width: 540 }}>
      <h1 style={{ marginBottom: 6 }}>Welcome</h1>
      <p style={{ marginTop: 0, color: '#4b2b83' }}>AI-Powered Learning System — Select a role to get started</p>
      <div style={{ marginTop: 18, display: 'flex', gap: 14, justifyContent: 'center' }}>
        <button className="role-btn" onClick={() => onSelectRole('user')}>Log in as User</button>
        <button className="role-btn role-btn-outline" onClick={handleAdmin}>Log in as Admin</button>
      </div>
    </div>
  );
}
