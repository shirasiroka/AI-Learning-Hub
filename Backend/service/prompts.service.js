
import { OpenAI } from "openai";
import Prompt from "../models/prompt.models.js";
import 'dotenv/config';

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Create a new prompt and get AI response
export async function createPrompt(data) {
  const { user_id, category_id, prompt } = data;

  try {
 
    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500, 
    });

    const aiAnswer = response.choices[0].message.content;

    const newPrompt = new Prompt({
      user_id,
      category_id,
      prompt,
      response: aiAnswer
    });

    return await newPrompt.save();

  } catch (error) {
    
    if (error.response) {
      console.error("OpenAI API Error Status:", error.response.status);
      console.error("OpenAI API Error Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
    
    // Throw explanation error;
    throw new Error(error.message || "נכשלה הפנייה לבינה המלאכותית");
  }
}
// Get all prompts with optional filters
export async function getAllPrompts(filters = {}) {
    return Prompt.find(filters)
        .populate('user_id', 'name phone')
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name category_id')
        .sort({ created_at: -1 })
        .exec();
}
// Get a single prompt by ID with populated references
export async function getPrompt(id) {
    return Prompt.findById(id)
        .populate('user_id', 'name phone')
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name category_id')
        .exec();
}
// Update a prompt by ID
export async function updatePrompt(id, payload) {
    return Prompt.findByIdAndUpdate(id, payload, { new: true }).exec();
}
// Delete a prompt by ID
export async function removePrompt(id) {
    return Prompt.findByIdAndDelete(id).exec();
}
// Get prompts by user ID with populated references
export async function getPromptsByUserId(userId) {
    return Prompt.find({ user_id: userId })
        .populate('category_id', 'name')
        .populate('sub_category_id', 'name')
        .sort({ created_at: -1 })
        .exec();
}



