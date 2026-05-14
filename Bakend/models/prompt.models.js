// models/prompt.models.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const promptSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_category_id: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
  prompt: { type: String, required: true },
  response: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'prompts' });

export default model('Prompt', promptSchema);