const BASE_URL = 'http://localhost:5000';


//get all categories
export async function getCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
//get subcategories for a category
export async function getSubCategories(categoryId) {
  const response = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories`);
  return await response.json();
};

//get all users
export async function getUsers() {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}


//get all prompts (the history of questions and answers)
export async function getPrompts() {
  try {
    const res = await fetch(`${BASE_URL}/prompts`);
    if (!res.ok) throw new Error('Failed to fetch prompts');
    return res.json();
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return [];
  }
}

//keeping a new prompt (question and answer)
export async function askAI(promptData) {
  try {
    const res = await fetch(`${BASE_URL}/prompts`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(promptData),
    });

    if (!res.ok) {
      // Error handling: try to get detailed error message from server response
      const errorDetail = await res.json();
      console.error('Server error detail:', errorDetail);
      throw new Error(errorDetail.message || 'Failed to create prompt');
    }

    return await res.json();
  } catch (error) {
    console.error('Error creating prompt:', error);
    return null;
  }
}
//function to get auth headers with token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '' // כאן קורה הקסם
  };
};

// create new category
export async function createCategory(categoryData) {
  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    });
    return await res.json();
  } catch (error) {
    console.error('Error creating category:', error);
  }
}
//create new user
export async function createUser(user) {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// create subcategory for an existing category
export async function createSubCategory(categoryId, subCategoryData) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories`, {
      method: 'POST',
      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(subCategoryData),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Server error creating subcategory:', err);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Network error creating subcategory:', error);
    return null;
  }
}

// update category
export async function updateCategory(categoryId, categoryData) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: 'PUT',
      headers: getAuthHeaders(), // משתמשים בפונקציית העזר
      body: JSON.stringify(categoryData),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error('Server error updating category:', err);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Network error updating category:', error);
    return null;
  }
}

// delete category
export async function deleteCategory(categoryId) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch (error) {
    console.error('Error deleting category:', error);
  }
}
// update subcategory
export async function updateSubCategory(categoryId, subCategoryId, subCategoryData) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),//{ 'Content-Type': 'application/json' },
      body: JSON.stringify(subCategoryData),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Server error updating subcategory:', err);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Network error updating subcategory:', error);
    return null;
  }
}

// delete subcategory
export async function deleteSubCategory(categoryId, subCategoryId) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}/subcategories/${subCategoryId}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch (error) {
    console.error('Network error deleting subcategory:', error);
    return false;
  }
}
