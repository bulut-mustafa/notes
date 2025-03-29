'use client';
import { Note } from "@/lib/types";
import Button from "../button"
import { addNoteToFav, deleteNote as deleteDb } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";
export default function ButtonBar({note}: {note: Note}) {
    const { updateNoteState, deleteNote } = useNotes();
    const router = useRouter();
    function handleClick() {
        console.log("Button clicked")
    }

    function handleFavorite() {
        const isFavorite = note.isFavorite;
        addNoteToFav(note.id, isFavorite);
        updateNoteState(note.id, { isFavorite: !isFavorite });
        console.log("clicked");
    }

    function handleDelete() {
        deleteDb(note.id);
        router.push("/notes");
        deleteNote(note.id);
    }
    return (
        <>
            <div className="flex gap-2 py-[6px] pl-4 border-b border-slate-200">
                <Button icon="back" onClick={() => window.history.back()} className=" md:hidden"/>
                <Button icon="heart" onClick={handleFavorite} className={`${note.isFavorite ? 'border-[#9f857a] bg-[#fff5f2]' : 'border-slate-200 '}`}/>
                <Button icon="trash" onClick={handleDelete} className="border-slate-200 "/>
                <Button icon="heart" onClick={handleClick} className="border-slate-200 "/>  
            </div> 
        </>
    )
}    