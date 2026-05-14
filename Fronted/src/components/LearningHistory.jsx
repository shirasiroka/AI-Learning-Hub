import { useEffect, useState } from 'react';
import { getUsers, getPrompts, askAI, getCategories, getSubCategories } from '../api/api';

export default function LearningHistory({ currentUser = null, showSubcategories = true }) {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedUser, setSelectedUser] = useState(currentUser?._id || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

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
      console.error('טעינת נתונים נכשלה', err);
    }
  }

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    console.log("Selected Category ID:", categoryId); 
    
    setSelectedCategory(categoryId);
    setSelectedSubCategory('');

    if (categoryId) {
      try {
        const subs = await getSubCategories(categoryId);
        console.log("Subcategories received from server:", subs);
        setSubCategories(subs || []);
      } catch (err) {
        console.error("טעינת תתי-קטגוריות נכשלה", err);
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  };

  async function handleAsk(e) {
    e.preventDefault();
    if (!selectedUser || !selectedCategory || !question) {
      return alert("נא לבחור משתמש, קטגוריה ולכתוב שאלה");
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
        setQuestion('');
        const updatedPrompts = await getPrompts();
        setPrompts(updatedPrompts || []);
      }
    } catch (error) {
      console.error("שגיאה בפנייה ל-AI:", error);
    } finally {
      setLoading(false);
    }
  }

  const userHistory = prompts.filter(p => 
    p.user_id === selectedUser || p.user_id?._id === selectedUser
  );

  return (
    <div className="card" style={{ padding: '20px', direction: 'rtl', maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>(AI) היסטוריית למידה</h2>
      
      <form onSubmit={handleAsk} style={{ marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={{ minWidth: 160 }}>
          <option value="">בחר משתמש</option>
          {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
        </select>

        <select value={selectedCategory} onChange={handleCategoryChange} style={{ minWidth: 160 }}> 
          <option value="">בחר קטגוריה</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select 
      value={selectedSubCategory} 
      onChange={(e) => setSelectedSubCategory(e.target.value)} 
      style={{ minWidth: 160 }}
      disabled={!selectedCategory} 
> 
  <option value="">בחר תת קטגוריה</option>
  {subCategories.map(s => (
    <option key={s._id} value={s._id}>{s.name}</option>
  ))}
</select>

        {showSubcategories && (
          <select 
            value={selectedSubCategory} 
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            style={{ minWidth: 160 }}
          >
            <option value="">בחר תת-קטגוריה (אופציונלי)</option>
            {subCategories.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        )}

        <input 
          placeholder="What do you want to learn today?" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          style={{ width: '300px' }}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'The AI is thinking...' : 'Ask the AI'}
        </button>
      </form>

      <div className="history-list" style={{ textAlign: 'center' }}>
        <h3>Your Previous Questions:</h3>
        {selectedUser === '' ? (
          <p>Select a user to view their history</p>
        ) : userHistory.length === 0 ? (
          <p>No questions have been asked by this user yet.</p>
        ) : (
          userHistory.map((item) => (
            <div key={item._id} style={{ 
              backgroundColor: '#f4f4f4', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              borderRight: '5px solid #007bff',
              textAlign: 'right'
            }}>
              <p><strong>שאלה:</strong> {item.prompt}</p>
              
              <div style={{ marginTop: '10px', color: '#2e7d32', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '5px' }}>
                <strong>תשובת AI:</strong>
                <p>{item.response || "התשובה בתהליך עיבוד..."}</p>
              </div>
              
              <small style={{ color: '#888', display: 'block', marginTop: 8 }}>
                בתאריך: {new Date(item.created_at).toLocaleString('he-IL')}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}