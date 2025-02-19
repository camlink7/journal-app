"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = registerNewUser;
const database_1 = require("../database/database");
const utils_1 = require("../utils/utils");
async function registerNewUser(user) {
    const result = await database_1.db
        .insertInto("user")
        .values({
        ...user,
        created_at_timestamp: (0, utils_1.getMySQLDateTime)() // Ensure timestamp is set
    })
        .executeTakeFirst();
}
