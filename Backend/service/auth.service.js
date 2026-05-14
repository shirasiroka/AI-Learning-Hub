import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

 // Handles User Registration or Login.
 // In this MVP version, authentication is simplified via phone number.
 // If the user doesn't exist, a new record is created.
 
export async function registerOrLogin({ name, phone }) {
  // Check if a user with this phone number already exists in the database
  let user = await User.findOne({ phone }).exec();
  
  if (!user) {
    // If not found, create a new user record
    user = await User.create({ name, phone });
  }

  // Generate a JWT token containing the user's unique ID and role
  // This token is valid for 7 days
  const token = jwt.sign(
    { id: user._id.toString(), role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );

  return { token, user };
}

 // Helper function to sign a new JWT token for a specific user.
 
export function signTokenForUser(user) {
  return jwt.sign(
    { id: user._id.toString(), role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }
  );
}


 // Wrapper function for token generation (reusing signTokenForUser).

export function generateTokenForUser(user) {
  return signTokenForUser(user);
}


 // Ensures an Admin user exists in the system.
 // Useful for development and initial setup to guarantee admin access.
 
export async function getOrCreateAdmin({ name = 'admin', phone = '000' } = {}) {
  // Attempt to find the admin by their unique phone identifier
  let user = await User.findOne({ phone }).exec();
  
  if (!user) {
    // If admin doesn't exist, create one with the 'admin' role
    user = await User.create({ name, phone, role: 'admin' });
  } else if (user.role !== 'admin') {
    // If the user exists but isn't an admin, upgrade their role
    user.role = 'admin';
    await user.save();
  }
  
  return user;
}