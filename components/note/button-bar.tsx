'use client';

import { Note } from "@/lib/types";
import Button from "../button";
import { addNoteToFav, deleteNote as deleteDb } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function ButtonBar({ note }: { note: Note }) {
    const { updateNoteState, deleteNote } = useNotes();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleFavorite() {
        const isFavorite = note.isFavorite;
        addNoteToFav(note.id, isFavorite);
        updateNoteState(note.id, { isFavorite: !isFavorite });
        console.log("Favorite toggled");
    }

    function handleDelete() {
        deleteDb(note.id);
        router.push("/notes");
        deleteNote(note.id);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            console.log("Selected file:", file);
            // You can pass this to a parent handler, upload it, etc.
        }
    }

    return (
        <div className="flex gap-2 py-[6px] pl-4 border-b border-slate-200">
            <Button
                icon="back"
                onClick={() => window.history.back()}
                className="md:hidden"
            />
            <Button
                icon="heart"
                onClick={handleFavorite}
                className={`${note.isFavorite ? 'border-[#9f857a] bg-[#fff5f2]' : 'border-slate-200'}`}
            />
            <Button
                icon="trash"
                onClick={handleDelete}
                className="border-slate-200"
            />

            {/* File Upload Button */}
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
        </div>
    );
}
