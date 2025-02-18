import express from "express";
import admin from "../middleware/firebaseAdmin";
import verifyFirebaseToken from "../middleware/firebaseAuth";

const router = express.Router();

// User Registration (Account Creation)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Create a new user with Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });

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
