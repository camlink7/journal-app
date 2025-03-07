"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseAuth_1 = __importDefault(require("../middleware/firebaseAuth"));
const journalEntryController_1 = require("../controllers/journalEntryController");
const router = (0, express_1.Router)();
router.post("/create", firebaseAuth_1.default, async (req, res) => {
    let { content, title, tags } = req.body;
    let uid = "";
    if (!req.uid) {
        res.status(400).json({
            message: "Error creating new journal entry!",
            error: "Invalid authentication!",
        });
    }
    else {
        uid = req.uid.toString();
    }
    try {
        const newEntry = await (0, journalEntryController_1.createNewJournalEntry)(uid, content, title, tags);
        res.status(201).json({
            message: "New journal entry successfully created!",
            entry: newEntry
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating new journal entry!",
            error: error.message,
        });
    }
});
exports.default = router;
