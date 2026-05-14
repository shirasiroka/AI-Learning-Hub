import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Users from '../components/Users';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {

    const maybe = window.sessionStorage.getItem('isAdmin');
    if (maybe !== 'true') {

      alert('You must log in as an admin from the home page');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="card">
        <header style={{ textAlign: 'center' }}>
          <h1>Admin Dashboard</h1>
        </header>

        <section style={{ marginTop: 20 }}>
          <h3>Manage Categories and Subcategories</h3>
          <Categories isAdmin={true} />
        </section>

        <hr />

        <section>
          <h3>Users List:</h3>
          <Users />
        </section>
      </div>
    </div>
  );
}
