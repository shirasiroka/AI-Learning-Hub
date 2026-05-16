import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function registerOrLogin({ name, phone }) {
  // For MVP: register or login by phone (no password). If user exists, return token.
  let user = await User.findOne({ phone }).exec();
  if (!user) {
    user = await User.create({ name, phone });
  }
  const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user };
}

export function signTokenForUser(user) {
  return jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function generateTokenForUser(user) {
  return signTokenForUser(user);
}

export async function getOrCreateAdmin({ name = 'admin', phone = '000' } = {}) {
  // try find admin by phone, otherwise create with role admin
  let user = await User.findOne({ phone }).exec();
  if (!user) {
    user = await User.create({ name, phone, role: 'admin' });
  } else if (user.role !== 'admin') {
    user.role = 'admin';
    await user.save();
  }
  return user;
}
