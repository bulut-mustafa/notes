"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Note } from "@/lib/types";
import { useNotes } from "@/context/notes-context";
import { addNoteToFav, archiveNote, deleteNote as deleteDb, moveToTrash, pinNote } from "@/lib/actions";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../confirmation-modal";
import toast from "react-hot-toast";
export default function NoteActionCard({ isActive, note, folder }: { isActive: boolean, note: Note, folder: string }) {
    const { updateNoteState, deleteNote, sortNotes } = useNotes();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const router = useRouter();
    async function handleFavorite() {
        const isFavorite = note.isFavorite;
        const result = await addNoteToFav(note.id, isFavorite);
        if(result.success) {
            updateNoteState(note.id, { isFavorite: !isFavorite });
            toast.success(
                isFavorite ? "Removed from favorites" : "Added to favorites",
                {
                    icon: isFavorite ? "❌" : "✅",
                    duration: 2000,
                    position: "top-right",
                    style: {
                        background: isFavorite ? "#f8d7da" : "#d4edda",
                        color: isFavorite ? "#721c24" : "#155724",
    
                    },
                }
            );
        }
        else{
            toast.error("Failed to update note.")
        }
    }
   async function handlePin() {
        const isPinned = note.isPinned;
        
        const result = await pinNote(note.id, isPinned);
      
        if (result.success) {
          updateNoteState(note.id, { isPinned: !isPinned });
          toast.success(
            isPinned ? "Pin removed" : "Note pinned",
            {
              icon: isPinned ? "❌" : "✅",
              duration: 2000,
              position: "top-right",
              style: {
                background: isPinned ? "#f8d7da" : "#d4edda",
                color: isPinned ? "#721c24" : "#155724",
              },
            }
          );
          sortNotes();
          console.log("Pin toggled");
        } else {
          toast.error(result.message || "An error occurred", {
            duration: 2000,
            position: "top-right",
          });
          console.error("Failed to toggle pin");
        }
      }
    async function handleArchive() {
        const isArchived = note.archived;

        const result = await archiveNote(note.id, !isArchived);
        if(result.success) {
            toast.success(
                isArchived ? "Unarchived" : "Archived",
                {
                    duration: 2000,
                    position: "top-right",
                }
            );
            if (isActive) { router.push(isArchived ? "/archived" : "/notes"); } 
            setTimeout(() => deleteNote(note.id), 100);
        }
        else{
            toast.error("Failed to update note.")
        }

    }

    async function handleDelete() {

        const result = await moveToTrash(note.id, true);
        if(result.success) {
            toast.success("Moved to Trash", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
            if (isActive) { router.push("/notes"); } 
            setTimeout(() => deleteNote(note.id), 200);
        }
        else{
            toast.error("Failed to update note.")
        }
        
    }

    async function handleRestore() {
        const result = await moveToTrash(note.id, false);
        if(result.success) {

            toast.success("Note Restored", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
            if (isActive) { router.push("/deleted"); } 
            setTimeout(() => deleteNote(note.id), 100);
        }
        else{
            toast.error("Failed to update note.")
        }
    }

    async function handlePermanentRemove() {
        
        const result = await deleteDb(note.id);
        if(result.success) {
            toast.success("Note Deleted Permanently", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
            if (isActive) { router.push("/deleted"); } 
            setTimeout(() => deleteNote(note.id), 100);
        }
        else{
            toast.error("Failed to remove note")
        }
    }
    return (
        <div onClick={(e) => e.stopPropagation()}> 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`rounded-full group-hover:bg-[#fce4dc] ${isActive ? "bg-[#fce4dc]" : "bg-[#f3f3f3]"}`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                    fill="#937b70"
                                />
                                <path
                                    d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                                    fill="#937b70"
                                />
                                <path
                                    d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
                                    fill="#937b70"
                                />
                                <path
                                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                    stroke="#937b70"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </g>
                        </svg>
                    </button>

                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24" side="bottom" align="start">
                    <DropdownMenuGroup>
                        {folder === 'deleted' ? (
                            <>
                                <DropdownMenuItem className="text-xs" onSelect={handleRestore}>Restore</DropdownMenuItem>
                                <DropdownMenuItem className="text-xs" onSelect={() => setShowConfirmModal(true)}>Delete</DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem className="text-xs" onSelect={handleFavorite}>
                                    {note.isFavorite ? 'Unfavorite' : 'Favorite'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs" onSelect={handlePin}>
                                    {note.isPinned ? 'Unpin' : 'Pin'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs" onSelect={handleArchive}>
                                    {note.archived ? 'Unarchive' : 'Archive'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-xs" onSelect={handleDelete}>Delete</DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            {showConfirmModal && (
                <ConfirmationModal
                    text="Are you sure you want to delete this note?"
                    onClose={() => setShowConfirmModal(false)}
                    onConfirm={handlePermanentRemove}
                />
            )}
        </div>
    );

}