import React, { useEffect, useState } from 'react';
import Users from '../components/Users';
import LearningHistory from '../components/LearningHistory';
import { getUsers } from '../api/api';

// UserPage Component: The primary interface for learners to select their profile and interact with the AI.
export default function UserPage() {
  // --- State Management ---
  const [users, setUsers] = useState([]); // Stores the list of all registered users
  const [currentUser, setCurrentUser] = useState(null); // Stores the currently selected user profile

  // Fetch users from the database when the page is first loaded
  useEffect(() => { 
    load(); 
  }, []);

  // Function to fetch users list and update the local state
  async function load() { 
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers || []); 
  }

  return (
    <div className="container">
      <div className="card">
        {/* Header Section */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Learning Dashboard</h1>
        </header>

        <div style={{ marginTop: 20 }}>
          {/* User Selection Section */}
          <h3>Select Your Profile</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <select 
              value={currentUser?._id || ''} 
              onChange={(e) => {
                // Find the user object based on the selected ID from the dropdown
                const u = users.find(x => x._id === e.target.value);
                setCurrentUser(u || null);
              }}
              style={{ padding: '8px', borderRadius: '4px', minWidth: '200px' }}
            >
              <option value="">-- Choose an existing user --</option>
              {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
            </select>
          </div>

          {/* AI Interaction Section: Only visible if a user is selected */}
          <div style={{ marginTop: 30 }}>
            <h3>Consult with AI Assistant</h3>
            {currentUser ? (
              // Pass the selected user to the LearningHistory component
              <LearningHistory currentUser={currentUser} showSubcategories={false} />
            ) : (
              // Prompt the user to select a profile if none is active
              <p style={{ color: '#666', fontStyle: 'italic', textAlign: 'center' }}>
                Please select a user profile to start asking questions.
              </p>
            )}
          </div>

          <hr style={{ margin: '30px 0', opacity: 0.3 }} />

          {/* Registration Section: Shown only when no user is currently selected */}
          {!currentUser && (
            <div style={{ marginTop: 10 }}>
              <h3>New Learner? Register Here</h3>
              {/* onNewUser callback: automatically logs in the user after successful registration */}
              <Users onNewUser={(u) => { 
                load(); // Refresh the global users list
                setCurrentUser(u); // Set the newly created user as the active profile
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}