"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchNotesByFolder, addNoteToDB } from "@/lib/actions";
import { useAuth } from "./auth-context";
import { usePathname } from "next/navigation";
import { Note, NoteFormData } from "@/lib/types";

interface NotesContextType {
  notes: Note[];
  filteredNotes: Note[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string | null; 
  setSelectedTag: (tag: string | null) => void; 
  loading: boolean;
  addNote: (formData: NoteFormData) => Promise<Note | null>;
  refreshNotes: () => Promise<void>;
  updateNoteState: (noteId: string, updatedFields: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [notesCache, setNotesCache] = useState<Record<string, Note[]>>({});

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
  
    const cachedNotes = notesCache[currentFolder];
    if (cachedNotes) {
      setNotes(cachedNotes);
      setLoading(false);
      return;
    }
  
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
  
      setNotesCache((prev) => ({
        ...prev,
        [currentFolder]: sortedNotes,
      }));
  
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
      const updatedNotes = [newNote, ...notes].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  
      setNotes(updatedNotes);
  
      setNotesCache((prev) => ({
        ...prev,
        [currentFolder]: updatedNotes,
      }));
  
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      return null;
    }
  };
  const deleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesTag = selectedTag
      ? note.tags?.includes(selectedTag) 
      : true;
  
    return matchesSearch && matchesTag;
  }); 
  
  useEffect(() => {
    fetchNotes();
  }, [user?.uid, currentFolder]);


  return (
    <NotesContext.Provider value={{ notes, filteredNotes,selectedTag, setSelectedTag,  searchQuery, setSearchQuery, loading, addNote, refreshNotes: fetchNotes, updateNoteState, deleteNote }}>
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
