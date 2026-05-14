import * as categoryService from "../service/category.service.js";

// Add category (admin)
export async function createCategory(req, res) {
    try {
        const payload = req.body;
        if (!payload || !payload.name) return res.status(400).json({ message: 'Category name is required' });
        const newCategory = await categoryService.createCategory(payload);
        return res.status(201).json(newCategory);
    } catch (err) {
        console.error('createCategory error:', err);
        return res.status(500).json({ message: 'Error creating category', error: err.message });
    }
}

//Get all categories for dashboard (public)
export async function getCategories(req, res) {
    try {
        const categories = await categoryService.getAllCategories();
        return res.json(categories);
    } catch (err) {
        console.error('getCategories error:', err);
        return res.status(500).json({ message: 'Error fetching categories', error: err.message });
    }
}

// Get sub-categories by category ID
export async function getSubCategories(req, res) {
    try {
        const { categoryId } = req.params;
        if (!categoryId) return res.status(400).json({ message: 'categoryId param is required' });
        const subCategories = await categoryService.getSubCategoriesByCategoryId(categoryId);
        return res.json(subCategories);
    } catch (err) {
        console.error('getSubCategories error:', err);
        return res.status(500).json({ message: 'Error fetching sub-categories', error: err.message });
    }
}

// Get a single category by ID with populated sub-categories
export async function getCategoryById(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Category id is required' });
        const category = await categoryService.getCategoryById(id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        const subCategories = await categoryService.getSubCategoriesByCategoryId(id);
        return res.json({ category, subCategories });
    } catch (err) {
        console.error('getCategoryById error:', err);
        return res.status(500).json({ message: 'Error fetching category', error: err.message });
    }
}

// Update category (admin)
export async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;
        if (!id) return res.status(400).json({ message: 'Category id is required' });
        console.log('updateCategory called with id=', id, 'payload=', payload);
        const updated = await categoryService.updateCategory(id, payload);
        console.log('updateCategory result:', updated);
        if (!updated) return res.status(404).json({ message: 'Category not found' });
        return res.json(updated);
    } catch (err) {
        console.error('updateCategory error:', err);
        return res.status(500).json({ message: 'Error updating category', error: err.message });
    }
}

// Delete category (admin)
export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'Category id is required' });
        console.log('deleteCategory called with id=', id);
        const removed = await categoryService.deleteCategory(id);
        console.log('deleteCategory result:', removed);
        if (!removed) return res.status(404).json({ message: 'Category not found' });
        return res.status(204).send();
    } catch (err) {
        console.error('deleteCategory error:', err);
        return res.status(500).json({ message: 'Error deleting category', error: err.message });
    }
}

// Create a sub-category under a specific category (admin)
export async function createSubCategory(req, res) {
    try {
        const { categoryId } = req.params;
        const payload = req.body;
        if (!categoryId) return res.status(400).json({ message: 'categoryId param is required' });
        if (!payload || !payload.name) return res.status(400).json({ message: 'SubCategory name is required' });
        const created = await categoryService.createSubCategory(categoryId, payload);
        return res.status(201).json(created);
    } catch (err) {
        console.error('createSubCategory error:', err);
        return res.status(500).json({ message: 'Error creating sub-category', error: err.message });
    }
}

// Update sub-category (admin)
export async function updateSubCategory(req, res) {
    try {
        const { id } = req.params;
        const payload = req.body;
        if (!id) return res.status(400).json({ message: 'SubCategory id is required' });
        const updated = await categoryService.updateSubCategory(id, payload);
        if (!updated) return res.status(404).json({ message: 'SubCategory not found' });
        return res.json(updated);
    } catch (err) {
        console.error('updateSubCategory error:', err);
        return res.status(500).json({ message: 'Error updating sub-category', error: err.message });
    }
}

// Delete sub-category (admin)
export async function deleteSubCategory(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: 'SubCategory id is required' });
        const removed = await categoryService.deleteSubCategory(id);
        if (!removed) return res.status(404).json({ message: 'SubCategory not found' });
        return res.status(204).send();
    } catch (err) {
        console.error('deleteSubCategory error:', err);
        return res.status(500).json({ message: 'Error deleting sub-category', error: err.message });
    }
}