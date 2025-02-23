import { c } from "framer-motion/dist/types.d-6pKw1mTI";
import React from "react";


interface TimestampDisplayProps {
    timestamp: string | number; // Unix timestamp in seconds
}

const TimestampDisplay: React.FC<TimestampDisplayProps> = ({ timestamp }) => {
    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        const optionsTime: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime);
    
        return { formattedDate, formattedTime };
    };
    
    const { formattedDate, formattedTime } = formatTimestamp(Number(timestamp));

    return (
        <div>
            <span className="font-bold">{formattedDate}</span>
            <span> at {formattedTime}</span>
        </div>
        );
};

export default TimestampDisplay;