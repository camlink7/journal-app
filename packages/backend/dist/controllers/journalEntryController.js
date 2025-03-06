"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewJournalEntry = createNewJournalEntry;
const utils_1 = require("../utils/utils");
const uuid_1 = require("uuid");
async function createNewJournalEntry(content, title, tags) {
    // Parse and prepare tags CSV string
    let tags_csv = "";
    let tags_split = tags.trim().split(",");
    for (let i = 0; i < tags_split.length; i++) {
        tags_csv += tags_split[i].trim();
        if (i != tags_split.length - 1) {
            tags_csv += ",";
        }
    }
    // Prepare and create database object
    const entry = {
        entry_id: (0, uuid_1.v4)(),
        title: title.trim(),
        content,
        last_updated_unix: (0, utils_1.getMySQLDateTime)(),
        tags: tags_csv
    };
    //const result = await db
    // .insertInto("User")
    // .values({
    //     ...user,
    //     created_at_timestamp: getMySQLDateTime() // Ensure timestamp is set
    // })
    // .executeTakeFirst();
}
