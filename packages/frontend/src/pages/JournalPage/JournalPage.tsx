import React, { useEffect, useState } from "react";
import "./JournalPage.css";
import JournalEntryCard from "./components/JournalEntryCard/JournalEntryCard";

export default function JournalPage(){

    const keys = ["123f", "f3a", "fab"];

    const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

    const handleSelectEntry = ((entryId: string) => {
        setSelectedEntry(entryId);
    })

    return (
        <>
            <div className="journal-page-grid lg:grid lg:grid-cols-[3fr_10fr] 
                w-full">
                <div className="journal-entries-container min-h-screen flex justify-center
                    bg-base-300 w-full shadow-[4px_0_10px_rgba(0,0,0,0.2)] items-stretch">
                    
                    <div className="grid grid-rows-[1fr_6fr] border-none w-full h-full">
                        <div className="bg-base-200 py-1 flex items-center justify-center">
                            <h1 className="text-3xl">Journal Entries</h1>
                        </div>
                        <div className="w-full max-h-screen overflow-y-scroll ">
                            { keys.map((key) => {
                                    return <JournalEntryCard key={key} entryData={{
                                        entry_id: key,
                                        title: "The Worst Day!",
                                        last_updated_unix: 1740191795,
                                        tags: ["Unfortunate", "Statistics", "Bad"]
                                    }
                                    } onClickHandler={handleSelectEntry} selected={selectedEntry === key}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="active-journal-container lg:block items-stretch hidden">
                    <div className="active-journal-container-grid grid lg:grid-rows-[1fr_6fr]
                        grid-rows-1">
                        <div className="flex justify-center items-center bg-base-200">
                            <p>Active Journal Header</p>
                        </div>

                        <div className="min-h-screen journal-entry-zone flex justify-center
                             items-center">
                            <p>Journal Entry Field</p>
                        </div>
                    </div>
                    
                </div>

                {/* <div className="profile-side-container flex justify-center items-center bg-base-200">
                    <p>Profile Side Container</p>
                </div> */}
            </div>
        </>
    );
}