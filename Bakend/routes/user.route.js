
import express from "express";
import { getuser, getusers, updateuser, adduser, deleteuser, getUserHistory } from "../controllers/users.controller.js";

const router = express.Router();

// CRUD routes for users
router.get('/', getusers);
router.get('/:id', getuser);
router.put('/:id', updateuser);
router.post('/', adduser);
router.delete('/:id', deleteuser);
// route to get user history (prompts created by the user)
router.get('/:id/history', getUserHistory); 

export default router;