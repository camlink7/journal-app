import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

export interface Database {
    User: UserTable,
    JournalEntry: JournalEntryTable
};

// User Table
export interface UserTable {
    uid: Generated<string>
    email: string
    nickname: string | null
    created_at_timestamp: ColumnType<Date, string | undefined, never>
};
export type DB_User = Selectable<UserTable>;
export type DB_NewUser = Insertable<UserTable>;
export type DB_UserUpdate = Updateable<UserTable>;

// Journal Entry Table
export interface JournalEntryTable {
    owner_uid: string,
    entry_id: Generated<string>
    title: string | null
    content: string
    last_updated_unix: ColumnType<string | undefined, never>
    tags: string | null
}
export type DB_JournalEntry = Selectable<JournalEntryTable>;
export type DB_NewJournalEntry = Insertable<JournalEntryTable>;
export type DB_JournalEntryUpdate = Updateable<JournalEntryTable>;