import * as authService from '../service/auth.service.js';

// For simplicity, we use the same registerOrLogin function for both registration and login.
export async function register(req, res) {
  try {
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'name and phone required' });
    const { token, user } = await authService.registerOrLogin({ name, phone });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// For MVP simplicity, we treat login the same as registration. 
export async function login(req, res) {
  return register(req, res);
}
// This endpoint is for development purposes only. It creates or retrieves an admin user and returns a token.
export async function getDevAdminToken(req, res) {
  try {
    // Only allow in non-production or when a DEV_ADMIN_KEY matches
    const devKey = process.env.DEV_ADMIN_KEY || '';
    if (process.env.NODE_ENV === 'production' && !devKey) {
      return res.status(403).json({ message: 'Dev token not available in production' });
    }
    if (devKey && req.query.key && req.query.key !== devKey) {
      return res.status(403).json({ message: 'Invalid dev key' });
    }
    const admin = await authService.getOrCreateAdmin();
    const token = authService.generateTokenForUser(admin);
    return res.json({ token, user: admin });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
