"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebaseAdmin_1 = __importDefault(require("../middleware/firebaseAdmin"));
const utils_1 = require("../utils/utils");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// User Registration (Account Creation)
router.post("/register", async (req, res) => {
    const { email, password, nickname } = req.body;
    try {
        // Validate params
        if (!email || !password || email.trim() === "" || password.trim() === "") {
            return res.status(400).json({ error: "Valid email and password is required!" });
        }
        // Create a new user with Firebase Authentication
        const userRecord = await firebaseAdmin_1.default.auth().createUser({
            email,
            password,
        });
        // Create a new user record in our DB
        const newUser = {
            uid: userRecord.uid,
            email,
            nickname: nickname ?? null,
            created_at_timestamp: (0, utils_1.getMySQLDateTime)()
        };
        await (0, userController_1.registerNewUser)(newUser);
        res.status(201).json({
            message: "User created successfully!",
            userId: userRecord.uid,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating user!",
            error: error.message,
        });
    }
});
exports.default = router;
