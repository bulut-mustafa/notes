"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import ImageBar from "@/components/note/image-bar";
import TagBar from "@/components/note/tag-bar";
import '@/components/new-note/text-editor-styles.scss';
import RichTextEditor from "@/components/new-note/text-editor";
export default function NotePage() {
    const { noteId } = useParams();
    const { notes } = useNotes();
    const note = notes.find((n) => n.id === noteId);
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState<string>(note?.content || "");

    if (!note) {
        return <p className="text-red-500 font-semibold">Note not found.</p>;
    }
    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        // Save the new content to the note
        console.log(newContent);
    }
    const handleCancelClick = () => {
        setIsEditing(false);
        setNewContent(note.content);
    }


    return (
        <div className="p-2 w-full h-full flex flex-col">    
            <ButtonBar note={note} isEditing={isEditing} onEdit={handleEditClick} onSave={handleSaveClick} onCancel={handleCancelClick}/>
            <div className="flex-1 p-2 md:p-4 space-y-4 overflow-auto h-full">
                <ImageBar note={note} />
                <h1 className="text-2xl font-bold text-black">{note.title}</h1>
                <TagBar tags={note.tags} note={note} />
                {isEditing ? (
                    <div className="w-full">
                        <RichTextEditor
                            content={note.content}
                            onChange={(newContent) =>
                                setNewContent(newContent)
                            }
                        />
                    </div>
                ): (<div
                    className="tiptap prose prose-sm sm:prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />)}
            </div>
        </div>
    );
}
