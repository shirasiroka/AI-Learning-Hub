
import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../api/api';

export default function Users({ onNewUser }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getUsers();
    setUsers(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !phone) return alert('Fill in both name and phone');

    // send all fields that the server requires to create a user
    const result = await createUser({ name, email, phone });

    if (result) {
      setName('');
      setEmail('');
      setPhone('');
      loadData(); 
      
      if (onNewUser) onNewUser(result);
    } else {
      alert("Error creating user. Please try again.");
    }
  }

  return (
    <div  style={{ textAlign: 'center' }}>
      <h2 style={{ marginTop: 0 }}>Register New Users</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ minWidth: 180 }} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ minWidth: 180 }} />
        <input placeholder="Phone (required)" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ minWidth: 140 }} />
        <button type="submit">Add User</button>
      </form>

      <h3>רשימת לומדים רשומים:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user._id} style={{ padding: '6px 0' }}>
            <strong>{user.name}</strong> ({user.email}) - {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}