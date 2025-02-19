import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely';

export interface Database {
    user: UserTable
};

// User Table
export interface UserTable {
    uid: Generated<string>
    email: string
    nickname: string | null
    created_at_timestamp: ColumnType<Date, string | undefined, never>
};
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;