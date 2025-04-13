'use client';

import { Note } from "@/lib/types";
import Button from "../button";
import { addNoteToFav, archiveNote, deleteNote as deleteDb, moveToTrash } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { updateNote } from "@/lib/actions";
export default function ButtonBar({ note }: { note: Note }) {
    const pathname = usePathname();
    const [uploading, setUploading] = useState(false);
    const folder = pathname.split("/")[1]; // "notes", "archived", etc.
    const { updateNoteState, deleteNote } = useNotes();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    function handleFavorite() {
        const isFavorite = note.isFavorite;
        addNoteToFav(note.id, isFavorite);
        updateNoteState(note.id, { isFavorite: !isFavorite });
        console.log("Favorite toggled");
    }

    function handleArchive() {
        archiveNote(note.id, true);
        router.push("/notes"); // Trigger navigation
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handleUnarchive() {
        archiveNote(note.id, false);
        router.push("/archived");
        setTimeout(() => deleteNote(note.id), 100);
    }


    function handleDelete() {
        moveToTrash(note.id, true);
        router.push("/notes");
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handleRestore() {
        moveToTrash(note.id, false);
        router.push("/deleted");
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handlePermanentRemove() {
        deleteDb(note.id);
        router.push("/deleted");
        setTimeout(() => deleteNote(note.id), 100);
    }


    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true); // Start loading

        try {
            const formData = new FormData();
            formData.append("file", file);
            let uploadedImage = "";

            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            uploadedImage = data.fileName;
            const newImages = [...(note.image || []), uploadedImage];

            await updateNote(note.id, { image: newImages });
            updateNoteState(note.id, { image: newImages });
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false); // End loading
        }
    }


    return (
        <div className="flex gap-2 py-[6px] pl-4 border-b border-slate-200">
            <Button
                icon="back"
                onClick={() => router.push(`/${folder}`)}
                className="md:hidden"
            />

            {folder === "deleted" ? (
                <>
                    <Button
                        icon="remove"
                        onClick={() => setShowConfirmModal(true)}
                        className="border-slate-200"
                    />
                    <Button
                        icon="restore" // use same icon
                        onClick={handleRestore}
                        className="border-slate-200"
                    />
                </>
            ) : (
                <>
                    <Button
                        icon="heart"
                        onClick={handleFavorite}
                        className={`${note.isFavorite ? "border-[#9f857a] bg-[#fff5f2]" : "border-slate-200"
                            }`}
                    />
                    <Button
                        icon="trash"
                        onClick={handleDelete}
                        className="border-slate-200"
                    />
                    {uploading ? (
                        <button
                            disabled
                            className="flex items-center gap-2 border px-3 py-1.5 rounded-md text-sm text-[#937b70] cursor-not-allowed bg-[#f6f1ef] border-[#937b70]"
                        >
                            <svg
                                className="w-5 h-5 animate-spin text-[#937b70]"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 28 28"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="11"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        </button>
                    ) : (
                        <>
                            <Button
                                icon="add-image"
                                className="border-slate-200"
                                asLabel
                                htmlFor="file-upload"
                            />
                            <input
                                type="file"
                                id="file-upload"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </>
                    )}
                    <Button
                        icon={note.archived ? "unarchive" : "archive"}
                        onClick={note.archived ? handleUnarchive : handleArchive}
                        className="border-slate-200"
                    />
                </>
            )}

            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur shadow-lg border bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4 text-center">Delete this note permanently?</h2>
                        <p className="text-sm text-gray-600 mb-6 text-center">This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-1.5 rounded-md text-sm border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handlePermanentRemove();
                                    setShowConfirmModal(false);
                                }}
                                className="px-4 py-1.5 rounded-md text-sm text-white bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}
