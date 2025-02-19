import { Router, Request, Response } from "express";
import admin from "../middleware/firebaseAdmin";
import verifyFirebaseToken from "../middleware/firebaseAuth";
import { getMySQLDateTime } from "../utils/utils";

import { NewUser } from "../database/db_types";

import { registerNewUser } from "../controllers/userController";

const router = Router();

// User Registration (Account Creation)
router.post("/register", async (req: Request, res: Response): Promise<any> => {
    const { email, password, nickname } = req.body;

    try {

        // Validate params
        if (!email || !password || email.trim() === "" || password.trim() === ""){
            return res.status(400).json({error: "Valid email and password is required!"});
        }

        // Create a new user with Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

        // Create a new user record in our DB
        const newUser: NewUser = {
            uid: userRecord.uid,
            email,
            nickname: nickname ?? null,
            created_at_timestamp: getMySQLDateTime()
        }
        await registerNewUser(newUser);

        res.status(201).json({
            message: "User created successfully!",
            userId: userRecord.uid,
        });
    } catch (error: any) {
        res.status(400).json({
            message: "Error creating user!",
            error: error.message,
        });
    }
});

export default router;
