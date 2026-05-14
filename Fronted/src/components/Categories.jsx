import { useEffect, useState } from 'react';
import { createCategory, getCategories, createSubCategory, updateCategory, deleteCategory, updateSubCategory, deleteSubCategory } from '../api/api';

export default function Categories({ isAdmin = false }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategoryForSub, setSelectedCategoryForSub] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data);
  }
//Functions for handling category and sub-category operations (create, edit, delete)
  async function handleCreateCategory(e) {
    e.preventDefault();
    if (!name) return alert('Insert category name');

    const res = await createCategory({ name, description });
    if (res) {
      setName('');
      setDescription('');
      loadCategories();
    } else {
      alert('Error creating category');
    }
  }

  async function handleEditCategory(cat) {
    const newName = prompt('Update category name', cat.name);
    if (!newName) return;
    const res = await updateCategory(cat._id, { name: newName });
    if (res) loadCategories();
    else alert('Error updating category');
  }

  async function handleDeleteCategory(cat) {
    if (!window.confirm(`Delete category "${cat.name}"? This action cannot be undone.`)) return;
    const ok = await deleteCategory(cat._1 || cat._id);
    if (ok) loadCategories();
    else alert('Error deleting category');
  }

  async function handleCreateSubCategory(e) {
    e.preventDefault();
    if (!selectedCategoryForSub) return alert('Select a main category to add a sub-category');
    if (!subName) return alert('Insert sub-category name');

    const res = await createSubCategory(selectedCategoryForSub, { name: subName });
    if (res) {
      setSubName('');
      setSelectedCategoryForSub('');
      loadCategories();
    } else {
      alert('Error creating sub-category');
    }
  }

  async function handleEditSubCategory(catId, sub) {
    const newName = prompt('Update sub-category name', sub.name);
    if (!newName) return;
    const res = await updateSubCategory(catId, sub._id, { name: newName });
    if (res) loadCategories();
    else alert('Error updating sub-category');
  }

  async function handleDeleteSubCategory(catId, sub) {
    if (!window.confirm(`Delete sub-category "${sub.name}"?`)) return;
    const ok = await deleteSubCategory(catId, sub._id || sub._1);
    if (ok) loadCategories();
    else alert('Error deleting sub-category');
  }

  return (
    <div  style={{ marginTop: '20px', maxWidth: 800 }}>
      <h2>Categories Studies</h2>

      {isAdmin && (
        <div style={{ marginBottom: '20px' }}>
          <form onSubmit={handleCreateCategory} style={{ marginBottom: '10px', display: 'flex', gap: '8px' }}>
            <input placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
           {/* <input placeholder="תיאור קצר (אופציונלי)" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
            <button type="submit">Add Category</button>
          </form>

          <form onSubmit={handleCreateSubCategory} style={{ display: 'flex', gap: '8px' }}>
            <select value={selectedCategoryForSub} onChange={(e) => setSelectedCategoryForSub(e.target.value)}>
              <option value="">Select a main category to add a sub-category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <input placeholder="Sub-category Name" value={subName} onChange={(e) => setSubName(e.target.value)} />
            <button type="submit">Add Sub-category</button>
          </form>
        </div>
      )}

  <h3>רשימת קטגוריות:</h3>
  <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'right' }}>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li key={cat._id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <strong style={{ display: 'block', fontSize: '1.05em' }}>{cat.name}</strong>
                  {cat.description ? <div style={{ color: '#666' }}>{cat.description}</div> : null}
                </div>
              </div>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <ul style={{ marginTop: '8px', paddingLeft: '12px', display: 'inline-block', textAlign: 'right' }}>
                  {cat.subcategories.map(s => (
                    <li key={s._1} style={{ fontSize: '0.95em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
                      <span>• {s.name}</span>
                      {isAdmin && (
                        <span style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => handleEditSubCategory(cat._id, s)} style={{ fontSize: '0.8em' }}>עדכן</button>
                          <button onClick={() => handleDeleteSubCategory(cat._id, s)} style={{ fontSize: '0.8em', color: 'red' }}>מחק</button>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {isAdmin && (
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEditCategory(cat)} style={{ fontSize: '0.9em' }}>עדכן קטגוריה</button>
                  <button onClick={() => handleDeleteCategory(cat)} style={{ fontSize: '0.9em', color: 'red' }}>מחק קטגוריה</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <li>No categories available.</li>
        )}
      </ul>
    </div>
  );
}