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
  import toast from "react-hot-toast";
  import { useDebouncedCallback } from "use-debounce"; // install via `npm install use-debounce`

  function formatDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };


    const formatted = new Date(date).toLocaleDateString("en-US", options);
    const parts = formatted.split(", ");

    const datePart = parts[0]?.trim();
    const timePart = parts[1]?.trim();

    return `${datePart}, ${timePart}`;
  }
  export default function NotePage() {
    const { noteId } = useParams();
    const { notes, updateNoteState, loading } = useNotes();
    const note = notes.find((n) => n.id === noteId);
    const [newContent, setNewContent] = useState<string>(note?.content || "");
    const [aiOpen, setAiOpen] = useState(false);
    const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

    const debouncedSave = useDebouncedCallback(async (content: string) => {
      if (!note) return;

      setSavingStatus("saving");
      const result = await updateNote(note.id, { content });

      if (result.success) {
        updateNoteState(note.id, { content });
        setSavingStatus("saved");

        // Optionally clear status after delay
        setTimeout(() => setSavingStatus("idle"), 1500);
      } else {
        setSavingStatus("error");
      }
    }, 1000); // 1 second debounce

    useEffect(() => {
      if (newContent !== note?.content) {
        debouncedSave(newContent);
      }
    }, [newContent]);
    

    // Sync newContent when note.content changes
    useEffect(() => {
      if (note?.content) {
        setNewContent(note.content);
      }
    }, [note?.content]);
    if (loading) {
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

   

    const handleAIOpen = () => {
      setAiOpen(!aiOpen);
    }
    const handleAIUpdate = async (newContent: string) => {
      const result = await updateNote(note.id, { content: newContent });
      if (result.success) {
        updateNoteState(note.id, { content: newContent });
        toast.success('AI updated your note!'); // Displays a success message
      } else {
        toast.error('AI failed to update your note!'); // Displays an error message
      }

    }

    return (
      <div className="relative p-2 w-full h-full flex flex-col overflow-x-hidden">
        <ButtonBar note={note}  onToggleAI={handleAIOpen} />
        {/* Accordion AI Section */}
        {aiOpen && (
          <AIAssistant
            noteContent={note.content}
            notes={notes.map((n, i) => `Note ${i + 1}:\n${n.content}`).join("\n\n")}
            onClose={() => setAiOpen(false)}
            onUpdateNote={(newContent) => handleAIUpdate(newContent)}

          />
        )}
        <div className="flex-1 p-2 md:p-4 space-y-4 overflow-auto h-full">
          <p className="text-xs text-gray-500 m-0">Last edited {formatDate(note.updatedAt)}</p>

          <ImageBar note={note} />
          <TagBar tags={note.tags} note={note} />
          <div className="w-full">
            <RichTextEditor content={newContent} onChange={setNewContent} />
            {savingStatus === "saving" && (
              <p className="text-xs text-gray-400 italic">Saving…</p>
            )}
            {savingStatus === "saved" && (
              <p className="text-xs text-green-500">Saved</p>
            )}
            {savingStatus === "error" && (
              <p className="text-xs text-red-500">Failed to save</p>
            )}
          </div>
        </div>
      </div>
    );
  }
