import React, { useEffect, useState } from "react";
import "./JournalPage.css";
import JournalEntryCard from "./components/JournalEntryCard/JournalEntryCard";
import { isMobile } from "react-device-detect";
import { motion, AnimatePresence } from "framer-motion";

export default function JournalPage(){

    const keys = ["123f", "f3a", "fab"];

    // Mobile Responsiveness
    const [mobile, setMobile] = useState(isMobile);
    useEffect(() => {
      const handleResize = () => {
        setMobile(window.innerWidth <= 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Entry Selection
    const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
    const handleSelectEntry = ((entryId: string) => {
        setSelectedEntry(entryId);
    })

    return (
        <>
            { (!mobile) ?
                (<div className="journal-page-grid grid grid-cols-[3fr_10fr] 
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
                    <div className="active-journal-container block items-stretch">
                        <div className="active-journal-container-grid grid grid-rows-[1fr_6fr]">
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
                </div>)
            
            : 
            (<div className="journal-page-grid grid grid-cols-1
                    w-full">


                    { (selectedEntry) ?
                        (
                        <motion.div key="selectedEntry"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}>
                            <div className="active-journal-container block items-stretch transition transition-all">
                                <div className="active-journal-container-grid grid grid-rows-[1fr_6fr]">
                                    <div className="flex justify-center items-center bg-base-200">
                                        <p>Active Journal Header</p>
                                    </div>

                                    <div className="min-h-screen journal-entry-zone flex justify-center
                                        items-center">
                                        <p>Journal Entry Field</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        )

                        :

                        (
                        <motion.div key="entryList"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            transition={{ duration: 0.4 }}>
                                <div className="journal-entries-container min-h-screen flex justify-center
                            bg-base-300 w-full shadow-[4px_0_10px_rgba(0,0,0,0.2)] items-stretch transition transition-all">
                            
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
                        </motion.div>
                       )
                    }
                    

                    {/* <div className="profile-side-container flex justify-center items-center bg-base-200">
                        <p>Profile Side Container</p>
                    </div> */}
                </div>)
            }

        </>
    );
}