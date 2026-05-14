import React, { useEffect, useState } from 'react';
import Users from '../components/Users';
import LearningHistory from '../components/LearningHistory';
import { getUsers } from '../api/api';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() { setUsers(await getUsers()); }

  return (
    <div className="container">
      <div className="card">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1> User Status </h1>
        </header>

        <div style={{ marginTop: 20 }}>
          <h3>Select an Existing User or Register</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
            <select value={currentUser?._id || ''} onChange={(e) => {
              const u = users.find(x => x._id === e.target.value);
              setCurrentUser(u || null);
            }}>
              <option value=""> Select User </option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>

          <div style={{ marginTop: 20 }}>
            <h3>Ask the AI</h3>
            {currentUser ? (
              <LearningHistory currentUser={currentUser} showSubcategories={false} />
            ) : (
              <p>Select a user to continue asking questions.</p>
            )}
          </div>

          <hr />

          {!currentUser && (
            <div style={{ marginTop: 10 }}>
              <h3>Register New User</h3>
              <Users onNewUser={(u) => { load(); setCurrentUser(u); }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
