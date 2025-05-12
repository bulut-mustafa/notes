"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { fetchNotesByFolder, addNoteToDB } from "@/lib/actions";
import { useAuth } from "./auth-context";
import { usePathname } from "next/navigation";
import { Note, NoteFormData } from "@/lib/types";

type UpdateAction = "archive" | "unarchive" | "trash" | "restore" | "permanent-delete";
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
  moveNoteBetweenCaches: (noteId: string, action: UpdateAction) => void;
  sortNotes: () => void;
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

const moveNoteBetweenCaches = (noteId: string, action: UpdateAction) => {
  setNotesCache((prevCache) => {
    const folders = ["notes", "archived", "deleted"];

    // Find the note from any folder
    let targetNote: Note | undefined;
    for (const folder of folders) {
      const notesInFolder = prevCache[folder] || [];
      const found = notesInFolder.find((n) => n.id === noteId);
      if (found) {
        targetNote = found;
        break;
      }
    }
    if (!targetNote) return prevCache; // If note not found, do nothing

    // Prepare new states
    const updatedNote = { ...targetNote, updatedAt: new Date().toISOString() };

    let removeFrom: string[] = [];
    let addTo: string | null = null;

    if (action === "archive") {
      updatedNote.archived = true;
      updatedNote.isDeleted = false;
      removeFrom = ["notes"];
      addTo = "archived";
    } else if (action === "unarchive") {
      updatedNote.archived = false;
      updatedNote.isDeleted = false;
      removeFrom = ["archived"];
      addTo = "notes";
    } else if (action === "trash") {
      updatedNote.isDeleted = true;
      updatedNote.archived = false;
      removeFrom = ["notes", "archived"];
      addTo = "deleted";
    } else if (action === "restore") {
      updatedNote.isDeleted = false;
      updatedNote.archived = false;
      removeFrom = ["deleted"];
      addTo = "notes";
    } else if (action === "permanent-delete") {
      removeFrom = ["deleted"];
      addTo = null;
    }

    const newCache = { ...prevCache };

    // Remove note from relevant folders
    for (const folder of removeFrom) {
      newCache[folder] = (newCache[folder] || []).filter((n) => n.id !== noteId);
    }

    // Add to destination folder (if any)
    if (addTo) {
      const existing = newCache[addTo] || [];
      newCache[addTo] = [updatedNote, ...existing];
    }

    return newCache;
  });

  // Also remove from visible notes state
  setNotes((prevNotes) => prevNotes.filter((n) => n.id !== noteId));
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
      const sortedNotes = fetchedNotes.sort((a, b) => {
        // 1. Pinned first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        // 2. Inside group → Newest updated first
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  
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
  const sortNotes = () => {
    setNotes((prevNotes) => {
      prevNotes.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Both pinned or both unpinned → sort by updatedAt desc
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      );
      return [...prevNotes];
    });
  };
  const addNote = async (formData: NoteFormData): Promise<Note | null> => {
    if (!user?.uid) return null;
    try {
      const result = await addNoteToDB(user.uid, formData);
  
      if (!result.success || !result.note) {
        console.error(result.message || "Unknown error adding note");
        return null;
      }
  
      const newNote = result.note;
  
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
    <NotesContext.Provider value={{ notes, filteredNotes,selectedTag, setSelectedTag,  searchQuery, setSearchQuery, loading, addNote, refreshNotes: fetchNotes, updateNoteState, deleteNote,moveNoteBetweenCaches,sortNotes }}>
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
