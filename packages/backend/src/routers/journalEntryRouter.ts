import { Router, Request, Response } from "express";
import admin from "../middleware/firebaseAdmin";
import verifyFirebaseToken from "../middleware/firebaseAuth";
import { getMySQLDateTime } from "../utils/utils";

const router = Router();

router.post("/create", async (req: Request, res: Response): Promise<any> => {
    const {content, title, tags} = req.body;

    try {
        
    }
    catch (error: any) {
        res.status(400).json({
            message: "Error creating new journal entry!",
            error: error.message,
        });
    }
});

export default router;