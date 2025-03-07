"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewJournalEntry = createNewJournalEntry;
const database_1 = require("../database/database");
const utils_1 = require("../utils/utils");
const uuid_1 = require("uuid");
async function createNewJournalEntry(uid, content, title, tags) {
    content = content?.trim() ?? "";
    title = title?.trim() ?? "";
    if (!tags) {
        tags = [];
    }
    // Default for title
    if (title.length <= 0) {
        title = "New Entry";
    }
    // Remove duplicate tags
    let tagSet = [...new Set(tags)];
    // Convert the tag set array into a CSV string
    let tagCsvString = tagSet.join(",");
    // Create a new user record in our DB
    const newEntry = {
        owner_uid: uid,
        entry_id: (0, uuid_1.v4)().toString(),
        content,
        title,
        last_updated_unix: (0, utils_1.getMySQLDateTime)(),
        tags: tagCsvString
    };
    const result = await database_1.db
        .insertInto("JournalEntry")
        .values(newEntry)
        .executeTakeFirst();
    return newEntry;
}
