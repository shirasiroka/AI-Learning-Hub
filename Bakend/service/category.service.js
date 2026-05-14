import SubCategory from '../models/subCategory.models.js';
import Category from "../models/category.models.js"; 
import mongoose from 'mongoose';

//Create a new category
export async function createCategory(categoryData) {
    const category = new Category(categoryData);
    return await category.save();
}

//Get all categories
export async function getAllCategories() {
  return Category.find().exec();
}
//Get a category by ID
export async function getCategoryById(id) {
  return Category.findById(id).exec();
}
//Update a category by ID
export async function updateCategory(id, payload) {
  return Category.findByIdAndUpdate(id, payload, { new: true }).exec();
}
//Delete a category by ID
export async function deleteCategory(id) {
  return Category.findByIdAndDelete(id).exec();
}
// Create a new sub-category under a specific category
export async function createSubCategory(categoryId, data) {
  const sc = new SubCategory({ ...data, category_id: categoryId });
  return sc.save();
}
// Get all sub-categories for a specific category
export async function getSubCategoriesByCategoryId(categoryId) {
  return SubCategory.find({ category_id: categoryId }).exec();
}
//Update a sub-category by ID
export async function updateSubCategory(id, payload) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  console.log(`Updating category with id: ${id}`); // Debug logging
  return SubCategory.findByIdAndUpdate(id, payload, { new: true }).exec();
}
//Delete a sub-category by ID
export async function deleteSubCategory(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  console.log(`Deleting category with id: ${id}`); // Debug logging
  return SubCategory.findByIdAndDelete(id).exec();
}
