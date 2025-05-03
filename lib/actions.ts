'use server';
import { db } from '../firebase';
import { collection, setDoc, getDoc,deleteDoc ,getDocs, doc, query, where, updateDoc, addDoc } from "firebase/firestore"; 
import type { Tag, NoteFormData, Note } from "@/lib/types";
import { revalidatePath } from 'next/cache';

const TAGS_COLLECTION = "tags";
const NOTES_COLLECTION = "notes";
export const addTag = async (userId: string, name: string) => {
  try {
    const tagId = `${userId}_${name}`;
    const docRef = doc(db, TAGS_COLLECTION, tagId);

    const tag = {
      userId: userId,
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, tag);
    revalidatePath(`/notes`); 
    return { id: tagId, ...tag };
  } catch (error) {
    console.error("Error adding reservation:", error);
    throw error;
  }
};

export const getTag = async (tagId: string) => {
  try {
    const docRef = doc(db, TAGS_COLLECTION, tagId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Tag not found");
    }
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw error;
  }
};

export const getTags = async (
  userId: string,
): Promise<Tag[]> => {
  const tagsRef = collection(db, "tags");
  const q = query(tagsRef, where("userId", "==", userId));

  try {
    const querySnapshot = await getDocs(q);
    const tags: Tag[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Tag, "id">; 
      return { id: doc.id, ...data }; 
    });
    return tags;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};

export const getAllTags = async (): Promise<Tag[]> => {
  const tagsRef = collection(db, "tags");

  try {
    const querySnapshot = await getDocs(tagsRef);
    const tags: Tag[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as Omit<Tag, "id">; 
      return { id: doc.id, ...data }; 
    });
    return tags;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }
};

export const deleteTag = async (tagID: string) => {
    const tagId = `${tagID}`;
    const tagsRef = doc(db, "tags", tagId);

    try {
        await deleteDoc(tagsRef);
        revalidatePath('/', 'layout')
        return { success: true };
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return { success: false, message: "Failed to delete tag" };
    }
};
export const getTagsByNotes = async (
    userId: string,
    noteId: string
  ): Promise<Tag[]> => {
    const reservationsRef = collection(db, "notes");
    const q = query(reservationsRef, where("userId", "==", userId), where("noteId", "==", noteId));
  
    try {
      const querySnapshot = await getDocs(q);
      const tags: Tag[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Tag, "id">; 
        return { id: doc.id, ...data }; 
      });
      return tags;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
  };
  
export const updateTag = async (tagId: string, name: string) => {
    const docRef = doc(db, TAGS_COLLECTION, tagId);
    try {
      const reservation = {
        name: name,
        updatedAt: new Date().toISOString(),
      };
        await updateDoc(docRef, reservation);
        revalidatePath('/', 'layout')
        console.log("Tag updated successfully!");
        return { success: true };
    } catch (error) {
        console.error("Error updating tag:", error);
        return { success: false, message: "Failed to update tag" };
    }
}

export const addNoteToDB = async (userId: string, formData: NoteFormData) => {
  try {
    const note = {
      userId,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

  
    const docRef = await addDoc(collection(db, NOTES_COLLECTION), note);
    
    revalidatePath(`/notes`);
    return {success: true, note: {id: docRef.id, ...note }};
  } catch (error) {
    console.error("Error adding note:", error);
    return { success: false, message: "Failed to add note" };
  }
};


export const fetchNotesByUser = async (userId: string): Promise<Note[]> => {
  try {
    const notesRef = collection(db, NOTES_COLLECTION);
    const q = query(notesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const notes: Note[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.noteId,
        userId: data.userId,
        content: data.content,
        image: data.image,
        tags: data.tags,
        archived: data.archived,
        isDeleted: data.isDeleted,
        newsAttached: data.newsAttached,
        isFavorite: data.isFavorite,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    });

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

export const fetchNotesByFolder = async (
  userId: string,
  archived: boolean = false,
  isDeleted: boolean = false
): Promise<Note[]> => {
  try {
    const notesRef = collection(db, NOTES_COLLECTION);
    const q = query(
      notesRef,
      where("userId", "==", userId),
      where("archived", "==", archived),
      where("isDeleted", "==", isDeleted)
    );

    const querySnapshot = await getDocs(q);
    const notes: Note[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};


export const fetchNotesByNoteId = async (noteId: string): Promise<Note[]> => {
  try {
    const notesRef = collection(db, NOTES_COLLECTION);
    
    const q = query(notesRef, where("noteId", "==", noteId));
    const querySnapshot = await getDocs(q);
    const notes: Note[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Note[];

    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};


export const updateNote = async (noteId: string, formData: Partial<NoteFormData>) => {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  try {
    await updateDoc(docRef, {
      ...formData,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to update note" };
  }
};

export const addNoteToFav = async (noteId: string, isFavorite: boolean) => {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  try {
    await updateDoc(docRef, {
      isFavorite: !isFavorite,
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to update note" };
  }
};
export const addTagToNote = async (noteId: string, tags: string[]) => {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  try {
    await updateDoc(docRef, {
      tags: tags,
      updatedAt: new Date().toISOString(),
    });
    console.log("Note added to favorites!");
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to add Tag" };
  }
};

export const archiveNote = async (noteId: string, archived: boolean) => {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  try {
    await updateDoc(docRef, {
      archived: archived,
      updatedAt: new Date().toISOString(),
    });
    console.log("Note added to favorites!");
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to archive/unarchive note" };
  }
};

export const deleteNote = async (noteId: string) => {
  const noteRef = doc(db, "notes", noteId);

  try {
      await deleteDoc(noteRef);
      revalidatePath('/notes', 'layout')
      return { success: true };
  } catch (error) {
      console.error("Error deleting reservation:", error);
      return { success: false, message: "Failed to delete note" };
  }
};

export const moveToTrash = async (noteId: string, isDeleted: boolean) => {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  try {
    await updateDoc(docRef, {
      isDeleted: isDeleted,
      updatedAt: new Date().toISOString(),
    });
    console.log("Note moved to trash!");
    return { success: true };
  } catch (error) {
    console.error("Error updating note:", error);
    return { success: false, message: "Failed to move note to trash" };
  }
}