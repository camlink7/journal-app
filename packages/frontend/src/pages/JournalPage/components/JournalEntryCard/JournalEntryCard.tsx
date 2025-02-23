import React from "react";
import {useEffect, useState} from "react";
import "./JournalEntryCard.css";
import { JournalEntry } from "journal-shared";
import { isMobile } from "react-device-detect"; 
import TimestampDisplay from "../../../../components/TimestampDisplay";

interface JournalEntryCardProps {
    entryData: JournalEntry,
    onClickHandler: (entryId: JournalEntry) => void,
    selected?: boolean
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({entryData, onClickHandler, selected = false}) => {

    // Mobile Responsiveness
    const [mobile, setMobile] = useState(isMobile);
    useEffect(() => {
        const handleResize = () => {
        setMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (<div className={`journal-entry-card w-full p-5 text-left max-h-fit 
        border-b-2 border-gray-600 ${(selected !== null && selected === false && !isMobile) && "hover:bg-blue-400 hover:bg-opacity-25"}
         ${selected && "border-blue-300 border-t-2 bg-blue-500 bg-opacity-40"}`}
            onClick={() => onClickHandler(entryData)}>

        <h1 className="text-xl font-bold my-2">{entryData.title}</h1>
        <TimestampDisplay timestamp={Number(entryData.last_updated_unix)}/>
        <div className="flex my-3">
            {entryData.tags.map((tag: string) => {
                return (<div className="entry-tag bg-blue-800 mr-2 px-2 rounded-full">
                        {tag}
                    </div>)
            })}
        </div>
    </div>);
}

export default JournalEntryCard;