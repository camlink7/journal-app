import { JournalEntry } from "journal-shared";
import { db } from "../database/database";
import { DB_JournalEntry, DB_JournalEntryUpdate, DB_NewJournalEntry } from "../database/db_types";
import { getMySQLDateTime } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export async function createNewJournalEntry(uid: string, content: string, title: string, tags: string[]): Promise<DB_JournalEntry>{

    content = content?.trim() ?? "";
    title = title?.trim() ?? "";
    if (!tags) { tags = []; }
    

    // Default for title
    if (title.length <= 0){
        title = "New Entry";
    }

    // Remove duplicate tags
    let tagSet = [...new Set(tags)];

    // Convert the tag set array into a CSV string
    let tagCsvString = tagSet.join(",");

    // Create a new user record in our DB
    const newEntry: DB_JournalEntry = {
        owner_uid: uid,
        entry_id: uuidv4().toString(),
        content,
        title,
        last_updated_unix: getMySQLDateTime(),
        tags: tagCsvString
    }


    const result = await db
        .insertInto("JournalEntry")
        .values(newEntry)
        .executeTakeFirst();


    return newEntry;
}