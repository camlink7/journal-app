import { Router, Request, Response } from "express";
import admin from "../middleware/firebaseAdmin";
import verifyFirebaseToken from "../middleware/firebaseAuth";
import { DB_JournalEntry } from "../database/db_types";
import { createNewJournalEntry } from "../controllers/journalEntryController";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const router = Router();

// Interfaces
interface CreateEntryRequest {
    content: string;
    title: string;
    tags: string[];
}

router.post("/create", verifyFirebaseToken, async (req: Request, res: Response): Promise<any> => {
    let {content, title, tags}: CreateEntryRequest = req.body;
    let uid = "";
    if (!req.uid){
        res.status(400).json({
            message: "Error creating new journal entry!",
            error: "Invalid authentication!",
        });
    }
    else {
        uid = req.uid.toString();
    }

    try {
        
        const newEntry: DB_JournalEntry = await createNewJournalEntry(uid, content, title, tags);

        res.status(201).json({
            message: "New journal entry successfully created!",
            entry: newEntry
        });
    }
    catch (error: any) {
        res.status(400).json({
            message: "Error creating new journal entry!",
            error: error.message,
        });
    }
});

export default router;