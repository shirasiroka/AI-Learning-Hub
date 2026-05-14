import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as userService from '../service/users.service.js';

dotenv.config();

// Middleware to authenticate requests using JWT tokens
export async function authMiddleware(req, res, next) {
  // allow disabling auth during development by setting DISABLE_AUTH=true in .env
  if (process.env.DISABLE_AUTH === 'true') {
    // inject a default admin user for convenience
    req.user = { id: 'dev-admin', role: 'admin' };
    return next();
  }

  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ message: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid Authorization header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request
    const user = await userService.getUser(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token: user not found' });
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
}
