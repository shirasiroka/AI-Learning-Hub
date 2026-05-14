import * as promptService from "../service/prompts.service.js";

//Add prompt - create a new prompt entry in the database
export async function addprompts(req, res) {
    try {
        const { user_id, category_id, sub_category_id, prompt } = req.body;

        // Basic validation according to model requirements
        if (!user_id || !category_id || !prompt) {
            return res.status(400).send("Missing required fields");
        }

        const result = await promptService.createPrompt({
            user_id,
            category_id,
            sub_category_id,
            prompt,
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get prompts with optional filters for user_id, category_id, sub_category_id
export async function getprompts(req, res) {
    try {
        const filters = {};
        if (req.query.user_id) filters.user_id = req.query.user_id;
        if (req.query.category_id) filters.category_id = req.query.category_id;
        if (req.query.sub_category_id) filters.sub_category_id = req.query.sub_category_id;
        const data = await promptService.getAllPrompts(filters);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get a single prompt by ID
export async function getprompt(req, res) {
    try {
        const id = req.params.id;
        const item = await promptService.getPrompt(id);
        if (!item) return res.status(404).send("Prompt not found");
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Update a prompt by ID
export async function updateprompts(req, res) {
    try {
        const id = req.params.id;
        const payload = req.body;
        const updated = await promptService.updatePrompt(id, payload);
        if (!updated) return res.status(404).send("Prompt not found");
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Delete a prompt by ID
export async function deleteprompts(req, res) {
    try {
        const id = req.params.id;
        await promptService.removePrompt(id);
        res.send("delete prompt successful!");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }}

  // For the Admin Dashboard: Display all prompts in the system
export async function getAllPromptsAdmin(req, res) {
    try {
        const allHistory = await promptService.getAllPrompts();
        res.json(allHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}