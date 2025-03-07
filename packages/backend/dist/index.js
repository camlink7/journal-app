"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const firebaseAuth_1 = __importDefault(require("./middleware/firebaseAuth"));
const cors = require("cors");
// Router imports
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const journalEntryRouter_1 = __importDefault(require("./routers/journalEntryRouter"));
// Load env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.disable('x-powered-by');
// Setup CORS (Cross-Origin Resource Sharing)
// Must include an array of URLs called 'origin', which are the URLS that are permitted to send requests to the API
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
// Allow the api use and parse JSON with Express.js
app.use(express_1.default.json());
// Allow CORS for the API to allow for credentials to be based in the requests
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
// App routers use statements
app.use("/users", userRouter_1.default);
app.use("/entries", journalEntryRouter_1.default);
// The highest level "catch-all" error handling to prevent the API from crashing all together.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal server error! Please try again later!");
});
// Basic endpoint to determine the status of the API
app.get("/status", (req, res) => {
    res.status(200).json({ status: "OK" });
});
// Endpoint to determine the status of the API with a protected route
app.get("/securestatus", firebaseAuth_1.default, (req, res) => {
    console.log(req.user?.uid);
    res.status(200).json({ message: "Authentication successful!", status: "OK" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
