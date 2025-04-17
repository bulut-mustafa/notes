"use client";
import { useParams } from "next/navigation";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import ImageBar from "@/components/note/image-bar";
import TagBar from "@/components/note/tag-bar";
export default function NotePage() {
    const { noteId } = useParams();
    const { notes } = useNotes();
    const note = notes.find((n) => n.id === noteId);

    

    if (!note) {        
        return <p className="text-red-500 font-semibold">Note not found.</p>;
    }

 

    return (     
        <div className="p-2 w-full">
            <ButtonBar note={note} />
            <div className="p-4 space-y-4">
                <ImageBar note={note}/>
                <h1 className="text-3xl font-bold text-black">{note.title}</h1>
                <TagBar tags={note.tags} note={note} />
                <p className="text-[#818181] leading-relaxed">{note.content}</p>
            </div>
        </div>
    );
}
