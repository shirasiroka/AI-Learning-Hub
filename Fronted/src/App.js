import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import UserPage from './pages/User';
import './App.css';


function AppContent() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  function handleSelectRole(r) {
   
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

   
    setRole('user');
    navigate('/user');
  }

  return (
      <div className="app-layout">
        <div style={{ position: 'absolute', top: 12, right: 16 }}>
          {role && (
            <button onClick={() => { setRole(null); navigate('/'); }} style={{ background: '#e74c3c' }}>Log Out</button>
          )}
        </div>

      <Routes>
        <Route path="/" element={<Home onSelectRole={handleSelectRole} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}