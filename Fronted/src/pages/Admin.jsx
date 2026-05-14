import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Users from '../components/Users';

// Admin Page: Main dashboard for managing platform content and users.
export default function Admin() {
  const navigate = useNavigate();

  // --- Access Control Logic ---
  useEffect(() => {
    // Check for admin credentials in sessionStorage to protect the route
    const isAdminAuthenticated = window.sessionStorage.getItem('isAdmin');
    
    if (isAdminAuthenticated !== 'true') {
      // If not authenticated, alert the user and redirect to the home page
      alert('Access Denied: You must log in as an admin from the home page');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="card">
        {/* Dashboard Header */}
        <header style={{ textAlign: 'center' }}>
          <h1>Admin Management Dashboard</h1>
        </header>

        {/* Categories Management Section */}
        <section style={{ marginTop: 20 }}>
          <h3>Topic Hierarchy Management</h3>
          <p style={{ color: '#666', fontSize: '0.9em' }}>Add, edit, or delete main categories and their nested subcategories.</p>
          <Categories isAdmin={true} />
        </section>

        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #eee' }} />

        {/* User Management Section */}
        <section>
          <h3>Platform User Directory</h3>
          <p style={{ color: '#666', fontSize: '0.9em' }}>View and register learners currently enrolled in the system.</p>
          <Users />
        </section>
      </div>
    </div>
  );
}