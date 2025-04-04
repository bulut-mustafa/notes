"use client";
import { useParams } from "next/navigation";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import Image from "next/image";
export default function NotePage() {
    const { noteId } = useParams();
    const { notes } = useNotes();

    // Find the note with the given noteId
    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        return <p className="text-red-500 font-semibold">Note not found.</p>;
    }

    return (
        <div className="p-2">
            <ButtonBar note={note} />
            <div className="p-4">
                {note.image && <Image
                    src={`https://notes-app-note-images.s3.amazonaws.com/${note.image}`}
                    alt="Note Image"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                />
                }

                <h1 className="text-2xl font-bold text-black mb-4">{note.title}</h1>
                <p className="text-[#818181] leading-relaxed">{note.content}</p>
            </div>
        </div>
    );
}
