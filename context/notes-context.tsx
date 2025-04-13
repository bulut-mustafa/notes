"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchNotesByFolder, addNoteToDB } from "@/lib/actions";
import { useAuth } from "./auth-context";
import { usePathname } from "next/navigation";
import { Note, NoteFormData } from "@/lib/types";

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  addNote: (formData: NoteFormData) => Promise<Note | null>;
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
      let archived = false;
      let isDeleted = false;
  
      if (currentFolder === "archived") {
        archived = true;
        isDeleted = false;
      } else if (currentFolder === "deleted") {
        isDeleted = true;
      }
  
      const fetchedNotes = await fetchNotesByFolder(user.uid, archived, isDeleted);
      const sortedNotes = fetchedNotes.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setNotes(sortedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (formData: NoteFormData): Promise<Note | null> => {
    if (!user?.uid) return null;
    try {
      const newNote = await addNoteToDB(user.uid, formData);
      setNotes((prevNotes) =>
        [newNote, ...prevNotes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      ); // Sort after adding
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      return null;
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
