export interface JournalEntry {
    entry_id: string;
    title: string;
    last_updated_unix: string | number;
    tags: Array<string>;
}
