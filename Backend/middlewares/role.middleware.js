// Middleware to check if user has admin role
export function adminMiddleware(req, res, next) {
  // If auth is disabled, allow everything
  if (process.env.DISABLE_AUTH === 'true') return next();
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Requires admin role' });
  next();
}
