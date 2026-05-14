import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();
// router for auth - register and login
router.post('/register', authController.register);
router.post('/login', authController.login);
// dev helper: get an admin token for local development (guarded)
// router.get('/dev-admin-token', authController.getDevAdminToken);

export default router;
