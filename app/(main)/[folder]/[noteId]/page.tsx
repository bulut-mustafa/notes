'use client';
import { useParams } from "next/navigation";
import ButtonBar from "@/components/button-bar";
export default function NotePage() {
    const { noteId } = useParams();

    return (
        <div className="p-2">
            <ButtonBar />
            <h1 className="text-2xl font-bold">Note {noteId}</h1>
            <p className="text-[#856559]">Here is the content of note {noteId}...</p>
        </div>
    );
}
