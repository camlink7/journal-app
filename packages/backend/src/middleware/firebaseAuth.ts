import { Request, Response, NextFunction } from "express";
import admin from "./firebaseAdmin";

// Middleware to Verify Firebase Token
const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    const token = authHeader.split("Bearer ")[1];
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
  };
  
  export default verifyFirebaseToken;
