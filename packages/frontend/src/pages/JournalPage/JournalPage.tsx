import React from "react";
import "./JournalPage.css";
import JournalEntryCard from "./components/JournalEntryCard/JournalEntryCard";

export default function JournalPage(){


    return (
        <>
            <div className="journal-page-grid lg:grid lg:grid-cols-[3fr_10fr] 
                w-full">
                <div className="journal-entries-container min-h-screen flex justify-center items-start
                    bg-base-300 w-full shadow-[4px_0_10px_rgba(0,0,0,0.2)]">
                    
                    <div className="grid border-none w-full">
                        <div className="bg-base-200 py-1">
                            <h1 className="text-3xl my-12">Journal Entries</h1>
                        </div>
                        <div className="h-100 w-full max-h-screen overflow-y-scroll">
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                            <JournalEntryCard/>
                        </div>
                    </div>
                </div>
                <div className="active-journal-container lg:block hidden">
                    <div className="active-journal-container-grid grid lg:grid-rows-[1fr_6fr]
                        grid-rows-1fr">
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