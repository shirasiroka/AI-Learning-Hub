// models/category.models.js
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true }
}, { collection: 'categories' });

export default model('Category', categorySchema);
