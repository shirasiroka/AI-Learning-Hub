import { useEffect, useState } from 'react';
import { 
  createCategory, getCategories, createSubCategory, 
  updateCategory, deleteCategory, updateSubCategory, deleteSubCategory 
} from '../api/api';


 // Categories Component
 // Manages the display and CRUD operations for categories and sub-categories.
 // @param {boolean} isAdmin - Determines if administrative controls should be displayed.
 
export default function Categories({ isAdmin = false }) {
  // --- State Management ---
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Fetches all categories from the backend and updates the state.
  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }

  // --- Category Operations ---

  // Handles the creation of a new main category.
  async function handleCreateCategory(e) {
    e.preventDefault();
    if (!name) return alert('Please insert a category name');

    const res = await createCategory({ name, description });
    if (res) {
      setName('');
      setDescription('');
      loadCategories(); // Refresh list
    } else {
      alert('Error: Could not create category');
    }
  }

  // Prompts the admin to update a category name.
  async function handleEditCategory(cat) {
    const newName = prompt('Update category name:', cat.name);
    if (!newName) return;
    const res = await updateCategory(cat._id, { name: newName });
    if (res) loadCategories();
    else alert('Error: Could not update category');
  }

  // Deletes a category after admin confirmation.
  async function handleDeleteCategory(cat) {
    if (!window.confirm(`Are you sure you want to delete "${cat.name}"? This action cannot be undone.`)) return;
    const ok = await deleteCategory(cat._id);
    if (ok) loadCategories();
    else alert('Error: Could not delete category');
  }

  // --- Sub-Category Operations ---

  // Handles the creation of a sub-category under a selected main category.
  async function handleCreateSubCategory(e) {
    e.preventDefault();
    if (!selectedCategoryForSub) return alert('Please select a main category first');
    if (!subName) return alert('Please insert a sub-category name');

    const res = await createSubCategory(selectedCategoryForSub, { name: subName });
    if (res) {
      setSubName('');
      setSelectedCategoryForSub('');
      loadCategories();
    } else {
      alert('Error: Could not create sub-category');
    }
  }


   //Prompts the admin to update a sub-category name.
   
  async function handleEditSubCategory(catId, sub) {
    const newName = prompt('Update sub-category name:', sub.name);
    if (!newName) return;
    const res = await updateSubCategory(catId, sub._id, { name: newName });
    if (res) loadCategories();
    else alert('Error: Could not update sub-category');
  }

  
   // Deletes a sub-category after admin confirmation.
   
  async function handleDeleteSubCategory(catId, sub) {
    if (!window.confirm(`Delete sub-category "${sub.name}"?`)) return;
    const ok = await deleteSubCategory(catId, sub._id);
    if (ok) loadCategories();
    else alert('Error: Could not delete sub-category');
  }

  return (
    <div style={{ marginTop: '20px', maxWidth: 800, fontFamily: 'Arial, sans-serif' }}>
      <h2>Learning Categories</h2>

      {/* Admin Panel: Visible only if isAdmin is true */}
      {isAdmin && (
        <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h4>Admin Management</h4>
          
          {/* Create Category Form */}
          <form onSubmit={handleCreateCategory} style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
            <input placeholder="New Category Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Add Category
            </button>
          </form>

          {/* Create Sub-Category Form */}
          <form onSubmit={handleCreateSubCategory} style={{ display: 'flex', gap: '8px' }}>
            <select value={selectedCategoryForSub} onChange={(e) => setSelectedCategoryForSub(e.target.value)}>
              <option value="">Select Main Category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <input placeholder="New Sub-category Name" value={subName} onChange={(e) => setSubName(e.target.value)} />
            <button type="submit" style={{ backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
              Add Sub-category
            </button>
          </form>
        </div>
      )}

      <h3>Available Topics</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li key={cat._id} style={{ padding: '15px', borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.2em', color: '#333' }}>{cat.name}</strong>
                  {cat.description && <p style={{ color: '#666', margin: '5px 0' }}>{cat.description}</p>}
                </div>
                
                {isAdmin && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEditCategory(cat)} style={{ cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteCategory(cat)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                  </div>
                )}
              </div>

              {/* Sub-categories List */}
              {cat.subcategories && cat.subcategories.length > 0 && (
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  {cat.subcategories.map(s => (
                    <li key={s._id} style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', maxWidth: '400px' }}>
                      <span>• {s.name}</span>
                      {isAdmin && (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleEditSubCategory(cat._id, s)} style={{ fontSize: '0.75em' }}>Edit</button>
                          <button onClick={() => handleDeleteSubCategory(cat._id, s)} style={{ fontSize: '0.75em', color: 'red' }}>Delete</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <p>No categories found. Start by adding one in the admin panel.</p>
        )}
      </ul>
    </div>
  );
}