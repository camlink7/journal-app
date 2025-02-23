import React, { useEffect, useState } from "react";
import "./JournalPage.css";
import JournalEntryCard from "./components/JournalEntryCard/JournalEntryCard";
import { isMobile } from "react-device-detect";
import { motion, AnimatePresence } from "framer-motion";
import { JournalEntry } from "journal-shared";
import TimestampDisplay from "../../components/TimestampDisplay";

export default function JournalPage(){

    const entries = [
        {
            entry_id: "test", 
            title: "The Worst Day!", 
            last_updated_unix: 1740191795,
            tags: ["Calculus", "Bad Day"]
        },
        {
            entry_id: "test2", 
            title: "The Best Day!", 
            last_updated_unix: 1740290799,
            tags: ["Coding"]
        }
    ]

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
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const handleSelectEntry = ((entry: JournalEntry) => {
        setSelectedEntry(entry);
    })

    // Add Tag to Entry
    const [newEntryTag, setNewEntryTag] = useState<string>("");
    const addTagToEntry = () => {
        if (!selectedEntry) {onAddTagModalClose(); return;}
        if (!newEntryTag) {onAddTagModalClose(); return;}

       let updatedEntry = selectedEntry;
       updatedEntry.tags.push(newEntryTag);
       setSelectedEntry(updatedEntry);

        onAddTagModalClose();
    }

    const onAddTagModalClose = () => {
        setNewEntryTag("");
    }

    return (
        <>
            <dialog id="add-tag-modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Add Entry Tag</h3>
                    <input type="text" placeholder="Type here" 
                        className="input input-bordered w-full max-w-xs"
                        value={newEntryTag}
                        onChange={(e) => setNewEntryTag(e.target.value)}/>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mx-2">Cancel</button>
                        <button className="btn mx-2" onClick={(e) => addTagToEntry()}>&nbsp;Add&nbsp;</button>
                    </form>
                    </div>
                </div>
            </dialog>
        

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
                                { entries.map((entry) => {
                                        return <JournalEntryCard key={entry.entry_id} entryData={entry}
                                        onClickHandler={handleSelectEntry} 
                                        selected={selectedEntry?.entry_id === entry.entry_id}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="active-journal-container block items-stretch">
                        {selectedEntry && 

                        <motion.div key="activeEntryHeader"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.4 }}>
                            <div className="active-journal-container-grid grid grid-rows-[1fr_6fr] grid-cols-[1fr-3fr-1fr]">
                                <div className="grid grid-rows-[2fr_1fr] items-center bg-base-200">

                                    <div className="flex items-center w-full px-3 border-b-2 border-neutral-700 h-full">
    
                                        <div className="w-full text-left mx-5">
                                            <h1 className="font-bold text-2xl">{selectedEntry.title}</h1>
                                            <p>
                                                <TimestampDisplay timestamp={selectedEntry.last_updated_unix}/>
                                            </p>
                                        </div>

                                        <button className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                        </button>    
                                    </div>
                                    
                                    <div className="flex justify-start items-center overflow-x-scroll">
                                        <button className="flex tag-pill rounded-full px-3 mx-2 text-lg border-dashed border"
                                            onClick={(e) => {
                                                let elem = document.getElementById('add-tag-modal');
                                                if (elem instanceof HTMLDialogElement){
                                                    elem.showModal();
                                                }
                                            }}>
                                            &nbsp;
                                            &nbsp;
                                            <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30s"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                            &nbsp;
                                            &nbsp;
                                        </button>
                                        { selectedEntry.tags.map((tag) => {
                                            return(
                                                <div className="tag-pill rounded-full px-3 bg-blue-800 mx-2 text-lg">
                                                    <p>{tag}</p>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="min-h-screen journal-entry-zone flex justify-center
                                    items-center">
                                        
                                </div>
                            </div>
                        </motion.div>
                        }
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
                                <div className="active-journal-container-grid grid grid-rows-[1fr_6fr] grid-cols-[1fr-3fr-1fr]">
                                    <div className="grid grid-rows-[2fr_1fr] items-center bg-base-200 ">

                                        <div className="flex items-center w-full px-3 border-b-2 border-neutral-700 h-full">
                                            <button onClick={(e) => setSelectedEntry(null) } className="ml-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2a10 10 0 0 1 .324 19.995l-.324 .005l-.324 -.005a10 10 0 0 1 .324 -19.995zm.707 5.293a1 1 0 0 0 -1.414 0l-4 4a1.048 1.048 0 0 0 -.083 .094l-.064 .092l-.052 .098l-.044 .11l-.03 .112l-.017 .126l-.003 .075l.004 .09l.007 .058l.025 .118l.035 .105l.054 .113l.043 .07l.071 .095l.054 .058l4 4l.094 .083a1 1 0 0 0 1.32 -1.497l-2.292 -2.293h5.585l.117 -.007a1 1 0 0 0 -.117 -1.993h-5.586l2.293 -2.293l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                                            </button>

                                            <div className="w-full text-left mx-5">
                                                <h1 className="font-bold text-2xl">{selectedEntry.title}</h1>
                                                <p>
                                                    <TimestampDisplay timestamp={selectedEntry.last_updated_unix}/>
                                                </p>
                                            </div>

                                            <button className="mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dots"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                            </button>    
                                        </div>
                                        
                                        <div className="flex justify-start items-center overflow-x-scroll text-nowrap">
                                            <button className="flex tag-pill rounded-full px-3 mx-2 text-lg border-dashed border"
                                                onClick={(e) => {
                                                    let elem = document.getElementById('add-tag-modal');
                                                    if (elem instanceof HTMLDialogElement){
                                                        elem.showModal();
                                                    }
                                                }}>
                                                &nbsp;
                                                &nbsp;
                                                <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30s"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                                &nbsp;
                                                &nbsp;
                                            </button>
                                            { selectedEntry.tags.map((tag) => {
                                                return(
                                                    <div className="tag-pill rounded-full px-3 bg-blue-800 mx-2 text-lg">
                                                        <p>{tag}</p>
                                                    </div>)
                                                })
                                            }
                                        </div>
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
                                        { entries.map((entry) => {
                                                return <JournalEntryCard key={entry.entry_id} entryData={entry}
                                                 onClickHandler={handleSelectEntry} 
                                                 selected={false}/>
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