import { db } from "../database/database";
import { User, NewUser, UserUpdate } from "../database/db_types";
import { getMySQLDateTime } from "../utils/utils";

export async function registerNewUser(user: NewUser){
    const result = await db
    .insertInto("User")
    .values({
        ...user,
        created_at_timestamp: getMySQLDateTime() // Ensure timestamp is set
    })
    .executeTakeFirst();
}