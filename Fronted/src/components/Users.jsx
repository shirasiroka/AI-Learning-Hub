import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../api/api';

// Users Component: Handles user registration and displays the list of enrolled learners.
export default function Users({ onNewUser }) {
  // --- State management for users list and form inputs ---
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch registered users when the component loads
  useEffect(() => {
    loadData();
  }, []);

  // Fetches the current list of users from the backend API
  async function loadData() {
    const data = await getUsers();
    setUsers(data);
  }

  // Handles the submission of the registration form
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Basic input validation: Name and Phone are mandatory according to project requirements
    if (!name || !phone) return alert('Please fill in both name and phone number');

    // API call to create a new user record in the database
    const result = await createUser({ name, email, phone });

    if (result) {
      // Clear form fields upon successful creation
      setName('');
      setEmail('');
      setPhone('');
      
      // Refresh the local user list
      loadData(); 
      
      // Optional callback to notify parent components of the new user
      if (onNewUser) onNewUser(result);
    } else {
      alert("Error: Could not create user. Please try again.");
    }
  }

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginTop: 0 }}>Learner Registration</h2>
      
      {/* Registration Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ minWidth: 180, padding: '5px' }} 
        />
        <input 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ minWidth: 180, padding: '5px' }} 
        />
        <input 
          placeholder="Phone Number (Required)" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          style={{ minWidth: 140, padding: '5px' }} 
        />
        <button type="submit" style={{ cursor: 'pointer', padding: '5px 15px' }}>
          Register User
        </button>
      </form>

      {/* List of Registered Users */}
      <h3>Registered Learners List</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user._id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>{user.name}</strong> {user.email ? `(${user.email})` : ''} — {user.phone}
            </li>
          ))
        ) : (
          <p style={{ color: '#888' }}>No learners registered yet.</p>
        )}
      </ul>
    </div>
  );
}