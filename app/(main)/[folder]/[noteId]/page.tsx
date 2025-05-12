"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import ImageBar from "@/components/note/image-bar";
import TagBar from "@/components/note/tag-bar";
import '@/components/new-note/text-editor-styles.scss';
import RichTextEditor from "@/components/new-note/text-editor";
import { updateNote } from "@/lib/actions";
import AIAssistant from "@/components/note/ai-assistant";
import Image from "next/image";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
export default function NotePage() {
    const { noteId } = useParams();
    const { notes, updateNoteState, loading } = useNotes();
    const note = notes.find((n) => n.id === noteId);
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState<string>(note?.content || "");
    const [aiOpen, setAiOpen] = useState(false);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (!isEditing) return; 
      
          if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();  
            handleSaveClick();
          }
      
          if (e.key === 'Escape') {
            e.preventDefault();
            handleCancelClick();
          }
        };
      
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [isEditing, newContent]);  

      // Sync newContent when note.content changes
      useEffect(() => {
        if (note?.content) {
          setNewContent(note.content);
        }
      }, [note?.content]);
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
        const result = await updateNote(note.id, { content: newContent });
        if(result.success){
          updateNoteState(note.id, { content: newContent });
          setIsEditing(false);
          setNewContent(note.content);
          toast.success('Saved!'); // Displays a success message
        }else{
          toast.error('Failed to save your note!'); // Displays an error message
        }
        
    }
    const handleCancelClick = () => {
        setIsEditing(false);
        setNewContent(note.content);
        toast.error('Cancelled!'); // Displays an error message
    }
    const handleAIOpen = () => {
        setAiOpen(!aiOpen);
    }
    const handleAIUpdate = async (newContent: string) => {
        if(isEditing){
          setNewContent(newContent);
        }
        else{
          const result = await updateNote(note.id, { content: newContent });
          if(result.success){
            updateNoteState(note.id, { content: newContent });
            toast.success('AI updated your note!'); // Displays a success message
          }else{
            toast.error('AI failed to update your note!'); // Displays an error message
          }
        }
        
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
                    onUpdateNote={(newContent) => handleAIUpdate(newContent)}

                />
            )}
            <div className="flex-1 p-2 md:p-4 space-y-4 overflow-auto h-full">
                <ImageBar note={note} />
                <TagBar tags={note.tags} note={note} />
                {isEditing ? (
                    <div className="w-full">
                        <RichTextEditor content={newContent} onChange={setNewContent} />
                    </div>
                ) : (<div id="note-content"
                    className="tiptap prose prose-sm sm:prose lg:prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
                    />)}
            </div>
        </div>
    );
}
