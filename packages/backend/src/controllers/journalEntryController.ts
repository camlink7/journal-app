import { JournalEntry } from "journal-shared";
import { db } from "../database/database";
import { DB_JournalEntry, DB_JournalEntryUpdate, DB_NewJournalEntry } from "../database/db_types";
import { getMySQLDateTime } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

export async function createNewJournalEntry(content: string, title: string, tags: string){

    // Parse and prepare tags CSV string
    let tags_csv = "";
    let tags_split = tags.trim().split(",");
    for (let i = 0; i < tags_split.length; i++){
        tags_csv += tags_split[i].trim();

        if (i != tags_split.length - 1){
            tags_csv += ",";
        }
    }

    // Prepare and create database object
    const entry: DB_JournalEntry = {
        entry_id: uuidv4(),
        title: title.trim(),
        content,
        last_updated_unix: getMySQLDateTime(),
        tags: tags_csv
    }


    const result = await db
        .insertInto("JournalEntry")
        .values(entry)
        .executeTakeFirst();
}