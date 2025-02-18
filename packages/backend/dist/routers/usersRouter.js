"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebaseAdmin_1 = __importDefault(require("../middleware/firebaseAdmin"));
const router = express_1.default.Router();
// User Registration (Account Creation)
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Create a new user with Firebase Authentication
        const userRecord = await firebaseAdmin_1.default.auth().createUser({
            email,
            password,
        });
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
