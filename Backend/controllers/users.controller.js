import * as userService from "../service/users.service.js";
import * as promptService from "../service/prompts.service.js";

//Add user - create a new user entry in the database
export async function adduser(req, res) {
    try {
        const { name, phone } = req.body;
      //Basic validation as per model requirements
        if (!name || !phone) {
            return res.status(400).json({ message: "Name and phone are required" });
        }
        const newUser = await userService.createUser({ name, phone });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//Get all users (for admin dashboard)
export async function getusers(req, res) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Critical function: Get learning history of a specific user
export async function getUserHistory(req, res) {
    try {
        const { id } = req.params;
        const history = await promptService.getPromptsByUserId(id);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Additional helper functions
export async function getuser(req, res) {
    try {
        const user = await userService.getUser(req.params.id);
        user ? res.json(user) : res.status(404).send('User not found');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update user by ID
export async function updateuser(req, res) {
    try {
        const id = req.params.id;
        const payload = req.body;
        const updated = await userService.updateDataOfUser(id, payload);
        if (!updated) return res.status(404).json({ message: 'User not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete user by ID
export async function deleteuser(req, res) {
    try {
        const id = req.params.id;
        const removed = await userService.removeUser(id);
        if (!removed) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}