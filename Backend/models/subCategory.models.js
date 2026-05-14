// models/subCategory.models.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const subCategorySchema = new Schema({
  name: { type: String, required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, { collection: 'sub_categories' });

export default model('SubCategory', subCategorySchema);