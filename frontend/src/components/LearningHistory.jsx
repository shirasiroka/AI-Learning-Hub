import { useEffect, useState } from 'react';
import { getUsers, getPrompts, askAI, getCategories, getSubCategories } from '../api/api';


 // LearningHistory Component
 // Main interface for users to interact with the AI and view their personal learning history.
 // Handles category-dependent filtering and asynchronous AI requests.
 //  @param {Object} currentUser - The currently logged-in user object.
 // @param {boolean} showSubcategories - Toggle for displaying sub-category selection.
 
export default function LearningHistory({ currentUser = null, showSubcategories = true }) {
  // --- Data States ---
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // --- Selection & Form States ---
  const [selectedUser, setSelectedUser] = useState(currentUser?._id || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  // Initial data fetch on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

 
   // Fetches users, prompts, and main categories concurrently for better performance.
   
  async function loadInitialData() {
    try {
      const [allUsers, allPrompts, allCategories] = await Promise.all([
        getUsers(),
        getPrompts(),
        getCategories()
      ]);
      setUsers(allUsers || []);
      setPrompts(allPrompts || []);
      setCategories(allCategories || []);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  }

  
   // Handles main category change.
   // Resets sub-category selection and fetches related sub-categories from the API.
   // @param {Event} e - Change event from the category dropdown.
   
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubCategory(''); // Reset sub-category when main category changes

    if (categoryId) {
      try {
        const subs = await getSubCategories(categoryId);
        setSubCategories(subs || []);
      } catch (err) {
        console.error("Failed to load sub-categories:", err);
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  // Submits the user prompt to the AI.
  // Validates input, triggers loading state, and refreshes history after a successful response.
  async function handleAsk(e) {
    e.preventDefault();
    if (!selectedUser || !selectedCategory || !question) {
      return alert("Please select a user, category, and enter your question.");
    }

    setLoading(true);
    try {
      const result = await askAI({ 
        user_id: selectedUser, 
        category_id: selectedCategory, 
        sub_category_id: selectedSubCategory, 
        prompt: question 
      });
      
      if (result) {
        setQuestion(''); // Clear input
        const updatedPrompts = await getPrompts(); // Refresh history list
        setPrompts(updatedPrompts || []);
      }
    } catch (error) {
      console.error("Error communicating with AI:", error);
      alert("Something went wrong with the AI request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Filters the global prompts list to show only items belonging to the selected user.
  const userHistory = prompts.filter(p => 
    p.user_id === selectedUser || p.user_id?._id === selectedUser
  );

  return (
    <div className="card" style={{ padding: '20px', direction: 'ltr', maxWidth: 800, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginTop: 0 }}>AI Learning History & Assistant</h2>
      
      {/* Search & Ask Form */}
      <form onSubmit={handleAsk} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* User Selection */}
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={{ minWidth: 160 }}>
          <option value="">Select User</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>

        {/* Main Category Selection */}
        <select value={selectedCategory} onChange={handleCategoryChange} style={{ minWidth: 160 }}> 
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        {/* Dynamic Sub-Category Selection */}
        <select 
          value={selectedSubCategory} 
          onChange={(e) => setSelectedSubCategory(e.target.value)} 
          style={{ minWidth: 160 }}
          disabled={!selectedCategory} 
        > 
          <option value="">Select Sub-Category</option>
          {subCategories.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        {/* Prompt Input */}
        <input 
          placeholder="What do you want to learn today?" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          style={{ width: '300px', padding: '8px' }}
        />
        
        <button type="submit" disabled={loading} style={{ padding: '8px 16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'AI is thinking...' : 'Ask AI'}
        </button>
      </form>

      {/* Learning History Display */}
      <div className="history-list" style={{ textAlign: 'left' }}>
        <h3>Your Learning History</h3>
        {selectedUser === '' ? (
          <p style={{ color: '#666' }}>Please select a user to view their previous learning sessions.</p>
        ) : userHistory.length === 0 ? (
          <p style={{ color: '#666' }}>No history found for this user. Be the first to ask a question!</p>
        ) : (
          userHistory.map((item) => (
            <div key={item._id} style={{ 
              backgroundColor: '#f9f9f9', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              borderLeft: '5px solid #007bff', // Indicated history item
              textAlign: 'left'
            }}>
              <p><strong>Prompt:</strong> {item.prompt}</p>
              
              <div style={{ marginTop: '10px', color: '#1b5e20', backgroundColor: '#e8f5e9', padding: '12px', borderRadius: '5px', border: '1px solid #c8e6c9' }}>
                <strong>AI Response:</strong>
                <p style={{ whiteSpace: 'pre-wrap' }}>{item.response || "The AI is processing your request..."}</p>
              </div>
              
              <small style={{ color: '#888', display: 'block', marginTop: 8 }}>
                Created on: {new Date(item.created_at).toLocaleString('en-US')}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}