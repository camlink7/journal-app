import express from "express";
import dotenv from "dotenv";
import verifyFirebaseToken from "./middleware/firebaseAuth";
import { Router, Request, Response } from "express";
const cors = require("cors");

// Router imports
import userRouter from "./routers/userRouter";
import journalEntryRouter from "./routers/journalEntryRouter";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.disable('x-powered-by');

// Setup CORS (Cross-Origin Resource Sharing)
// Must include an array of URLs called 'origin', which are the URLS that are permitted to send requests to the API
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}));

// Allow the api use and parse JSON with Express.js
app.use(express.json());

// Allow CORS for the API to allow for credentials to be based in the requests
app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// App routers use statements
app.use("/users", userRouter);
app.use("/entries", journalEntryRouter);


// The highest level "catch-all" error handling to prevent the API from crashing all together.
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Internal server error! Please try again later!");
});

// Basic endpoint to determine the status of the API
app.get("/status", (req, res) => {
  res.status(200).json({status: "OK"});
});

// Endpoint to determine the status of the API with a protected route
app.get("/securestatus", verifyFirebaseToken, (req, res) => {
  res.status(200).json({message: "Authentication successful!", status: "OK"});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});