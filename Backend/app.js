import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import promptsRoute from './routes/prompts.route.js';
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import jwt from 'jsonwebtoken'; 

// Initialize the Express application
const app = express();

// --- Middleware Configuration ---

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from the frontend
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// --- API Route Definitions ---

// Routes related to AI prompts and learning history
app.use('/prompts', promptsRoute);

// Routes for user management (Registration and retrieval)
app.use('/users', userRoute);

// Routes for category and sub-category management
app.use('/categories', categoryRoute);

// Export the app instance for use in server.js/index.js
export default app;