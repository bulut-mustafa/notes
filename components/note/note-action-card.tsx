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
import { addNoteToFav, archiveNote, deleteNote as deleteDb, moveToTrash } from "@/lib/actions";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../confirmation-modal";
export default function NoteActionCard({ isActive, note, folder }: { isActive: boolean, note: Note, folder: string }) {
    const { updateNoteState, deleteNote } = useNotes();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const router = useRouter();
    function handleFavorite() {
        const isFavorite = note.isFavorite;
        addNoteToFav(note.id, isFavorite);
        updateNoteState(note.id, { isFavorite: !isFavorite });
    }
    function handleArchive() {
        const isArchived = note.archived;
        archiveNote(note.id, !isArchived);
        if (isActive) { router.push(isArchived ? "/archived" : "/notes"); } // Trigger navigation
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handleDelete() {
        moveToTrash(note.id, true);
        if (isActive) { router.push("/notes"); } // Trigger navigation
        setTimeout(() => deleteNote(note.id), 200);
    }

    function handleRestore() {
        moveToTrash(note.id, false);
        if (isActive) { router.push("/deleted"); } // Trigger navigation
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handlePermanentRemove() {
        deleteDb(note.id);
        if (isActive) { router.push("/deleted"); } // Trigger navigation
        setTimeout(() => deleteNote(note.id), 100);
    }
    return (
        <div onClick={(e) => e.stopPropagation()}> {/* <- 🛑 blocks bubbling to NoteCard */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={`rounded-full group-hover:bg-[#fce4dc] ${isActive ? "bg-[#fce4dc]" : "bg-[#f3f3f3]"
                            }`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                    fill="#937b70"
                                ></path>
                                <path
                                    d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                                    fill="#937b70"
                                ></path>
                                <path
                                    d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
                                    fill="#937b70"
                                ></path>
                                <path
                                    d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                                    stroke="#937b70"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                ></path>
                            </g>
                        </svg>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32" side="bottom" align="start">
                    <DropdownMenuGroup>
                        {folder === 'deleted' ? (
                            <>
                                <DropdownMenuItem onSelect={handleRestore}>Restore</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setShowConfirmModal(true)}>Delete</DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem onSelect={handleFavorite}>
                                    {note.isFavorite ? 'Unfavorite' : 'Favorite'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleArchive}>
                                    {note.archived ? 'Unarchive' : 'Archive'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
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