// controllers/support.controller.js
import { createSupport } from "../services/support.service.js";

export const createSupportController = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("userid===>", userId);
        const support = await createSupport(req.body, userId);
        res.status(201).json({ message: "Request Submitted Successfully", data: support });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
