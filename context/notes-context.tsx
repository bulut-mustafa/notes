"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchNotesByFolder, addNoteToDB } from "@/lib/actions";
import { useAuth } from "./auth-context";
import { usePathname } from "next/navigation";
import { Note, NoteFormData } from "@/lib/types";

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  addNote: (formData: NoteFormData) => Promise<void>;
  refreshNotes: () => Promise<void>;
  updateNoteState: (noteId: string, updatedFields: Partial<Note>) => void; // New function
  deleteNote: (noteId: string) => void; // New function
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const currentFolder = pathname.split("/")[1]; // Extract folder name from URL

  const updateNoteState = (noteId: string, updatedFields: Partial<Note>) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, ...updatedFields } : note
      )
    );
  };
  const fetchNotes = async () => {
    if (!user?.uid || !currentFolder) return;
    setLoading(true);
    try {
      const fetchedNotes = await fetchNotesByFolder(user.uid, currentFolder);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (formData: NoteFormData) => {
    if (!user?.uid) return;
    try {
      const newNote = await addNoteToDB(user.uid, formData);
      setNotes((prevNotes) => [newNote, ...prevNotes]); // Instant UI update
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };
  useEffect(() => {
    fetchNotes();
  }, [user?.uid, currentFolder]); // Fetch notes when user logs in or folder changes

  return (
    <NotesContext.Provider value={{ notes, loading, addNote, refreshNotes: fetchNotes, updateNoteState, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
