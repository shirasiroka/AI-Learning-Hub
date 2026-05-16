import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import './App.css';

// AppContent: Contains the main logic for routing and role selection.
// Wrapped by BrowserRouter in the default export below.
function AppContent() {
  // --- Global State ---
  const [role, setRole] = useState(null); // Tracks if the current view is 'user', 'admin', or null (unauthenticated)
  const navigate = useNavigate();

  // handleSelectRole: Manages navigation and security checks based on the selected persona.
  function handleSelectRole(r) {
    
    // Logic for Admin role selection
    if (r === 'admin') {
      const code = window.prompt('Insert admin access code:');
      if (code === '1234') {
        setRole('admin');
        navigate('/admin');
      } else {
        alert('Wrong code. Access denied.');
      }
      return;
    }

    // Logic for standard User role selection
    setRole('user');
    navigate('/user');
  }

  return (
    <div className="app-layout">
      {/* Logout Header: Displays only when a role is active */}
      <div style={{ position: 'absolute', top: 12, right: 16 }}>
        {role && (
          <button 
            onClick={() => { setRole(null); navigate('/'); }} 
            style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Log Out
          </button>
        )}
      </div>

      {/* Main Routing Table */}
      <Routes>
        {/* Home Page: Entry point for role selection */}
        <Route path="/" element={<Home onSelectRole={handleSelectRole} />} />
        
        {/* Admin Dashboard: Protected via internal logic in the Admin component */}
        <Route path="/admin" element={<Admin />} />
        
        {/* User Workspace: Main interface for learners */}
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

// Main App Component: Provides the Router context to the entire application.
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}