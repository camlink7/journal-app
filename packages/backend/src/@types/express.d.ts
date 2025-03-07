import { Request } from 'express';
import { DB_User } from '../database/db_types';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

// Extend the Express Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: DB_User | DecodedIdToken | null;
      uid?: string | null;
      journalEntry?: JournalEntry;
    }
  }
}