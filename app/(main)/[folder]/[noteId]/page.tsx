"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import ImageBar from "@/components/note/image-bar";
import TagBar from "@/components/note/tag-bar";
import '@/components/new-note/text-editor-styles.scss';
import RichTextEditor from "@/components/new-note/text-editor";
import { updateNote } from "@/lib/actions";
import AIAssistant from "@/components/note/ai-assistant";
import Image from "next/image";

export default function NotePage() {
    const { noteId } = useParams();
    const { notes, updateNoteState, loading } = useNotes();
    const note = notes.find((n) => n.id === noteId);
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState<string>(note?.content || "");
    const [aiOpen, setAiOpen] = useState(false);
    if(loading) {
        return <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-[#d6c2bc] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-[#d6c2bc] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-[#d6c2bc] rounded-full animate-bounce"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading your note…</p>
      </div>
      
      ;
    }
    if (!note) {
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <Image src="/note-not-found.svg" alt="Note not found" width={200} height={200} />
            <p className="text-gray-600 font-medium">Oops! We couldn’t find this note.</p>
          </div>
        );
      }
    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        updateNote(note.id, { content: newContent });
        updateNoteState(note.id, { content: newContent });
        setIsEditing(false);
        setNewContent(note.content);
    }
    const handleCancelClick = () => {
        setIsEditing(false);
        setNewContent(note.content);
    }
    const handleAIOpen = () => {
        setAiOpen(!aiOpen);
    }

   
    return (
        <div className="relative p-2 w-full h-full flex flex-col overflow-x-hidden">
            <ButtonBar note={note} isEditing={isEditing} onEdit={handleEditClick} onSave={handleSaveClick} onCancel={handleCancelClick} onToggleAI={handleAIOpen} />
            {/* Accordion AI Section */}
            {aiOpen && (
                <AIAssistant
                    noteContent={note.content}
                    notes= {notes.map((n, i) => `Note ${i + 1}:\n${n.content}`).join("\n\n")}
                    onClose={() => setAiOpen(false)}
                />
            )}
            <div className="flex-1 p-2 md:p-4 space-y-4 overflow-auto h-full">
                <ImageBar note={note} />
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
                ) : (<div id="note-content"
                    className="tiptap prose prose-sm sm:prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />)}
            </div>
        </div>
    );
}
