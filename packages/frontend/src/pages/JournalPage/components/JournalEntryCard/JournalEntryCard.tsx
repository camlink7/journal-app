import React from "react";
import "./JournalEntryCard.css";
import { JournalEntry } from "journal-shared";
 
interface JournalEntryCardProps {
    entryData: JournalEntry,
    onClickHandler: (entryId: string) => void,
    selected?: boolean
}


const JournalEntryCard: React.FC<JournalEntryCardProps> = ({entryData, onClickHandler, selected = false}) => {

    return (<div className={`journal-entry-card w-full p-5 text-left max-h-fit 
        border-b-2 border-gray-600 ${(selected !== null && selected === false) && "hover:bg-blue-400 hover:bg-opacity-25"}
         ${selected && "border-blue-300 border-t-2 bg-blue-500 bg-opacity-40"}`}
            onClick={() => onClickHandler(entryData.entry_id)}>

        <h1 className="text-xl font-bold my-2">{entryData.title}</h1>
        <p>{new Date(Number(entryData.last_updated_unix) * 1000).toLocaleString()}</p>
        <div className="flex my-3">
            {entryData.tags.map((tag) => {
                return (<div className="entry-tag bg-blue-800 mr-2 px-2 rounded-full">
                        {tag}
                    </div>)
            })}
        </div>
    </div>);
}

export default JournalEntryCard;