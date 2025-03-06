import { db } from "../database/database";
import { DB_User, DB_NewUser, DB_UserUpdate } from "../database/db_types";
import { getMySQLDateTime } from "../utils/utils";

export async function registerNewUser(user: DB_NewUser){
    const result = await db
    .insertInto("User")
    .values({
        ...user,
        created_at_timestamp: getMySQLDateTime() // Ensure timestamp is set
    })
    .executeTakeFirst();
}