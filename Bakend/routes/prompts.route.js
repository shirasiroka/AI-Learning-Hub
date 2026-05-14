
import express from 'express';
import * as promptsController from '../controllers/prompts.controller.js';
const router = express.Router();
// CRUD routes for prompts
router.post('/', promptsController.addprompts);
router.get('/', promptsController.getprompts);
router.get('/:id', promptsController.getprompt);
router.put('/:id', promptsController.updateprompts);
router.delete('/:id', promptsController.deleteprompts);

export default router;