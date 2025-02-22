import React from "react";
import "./JournalEntryCard.css";

export default function JournalEntryCard(){

    const data = {
        entry_id: "3fae3-qera3a-fj3afhz",
        title: "The Worst Day!",
        last_updated_unix: 1740191795,
        tags: ["Unfortunate", "Statistics", "Bad"]
    }

    return (<div className="journal-entry-card w-full p-5 text-left max-h-fit 
        border-b-2 border-gray-600 hover:bg-neutral-800">
        <h1 className="text-xl font-bold my-2">{data.title}</h1>
        <p>{new Date(data.last_updated_unix * 1000).toLocaleString()}</p>
        <div className="flex my-3">
            {data.tags.map((tag) => {
                return (<div className="entry-tag bg-blue-800 mr-2 px-2 rounded-full">
                        {tag}
                    </div>)
            })}
        </div>
    </div>);
}