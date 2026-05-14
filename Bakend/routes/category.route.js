import express from 'express';
import * as categoryController from '../controllers/category.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/role.middleware.js';

const router = express.Router();

// public: get all categories and subcategories
router.get('/', categoryController.getCategories);
router.get('/:categoryId/subcategories', categoryController.getSubCategories);
// get single category (with subcategories)
router.get('/:id', categoryController.getCategoryById);

// admin routes - protected
router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.deleteCategory);

// subcategory admin routes
router.post('/:categoryId/subcategories', authMiddleware, adminMiddleware, categoryController.createSubCategory);
router.put('/subcategories/:id', authMiddleware, adminMiddleware, categoryController.updateSubCategory);
router.delete('/subcategories/:id', authMiddleware, adminMiddleware, categoryController.deleteSubCategory);

export default router;