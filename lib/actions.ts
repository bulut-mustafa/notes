'use server';
import { db } from '../firebase';
import { collection, setDoc, getDoc,deleteDoc ,getDocs, doc, query, where, updateDoc } from "firebase/firestore"; 
import type { Tag } from "@/lib/types";
import { revalidatePath } from 'next/cache';

const TAGS_COLLECTION = "tags";

export const addTag = async (userId: string, name: string) => {
  try {
    const tagId = `${userId}_${name}`; // Custom ID
    const docRef = doc(db, TAGS_COLLECTION, tagId);

    const tag = {
      userId: userId,
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(docRef, tag);
    revalidatePath(`/notes`); // Revalidate destination page
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
      const data = doc.data() as Omit<Tag, "id">; // Ensure "id" is not in data
      return { id: doc.id, ...data }; // Merge doc.id separately
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
      const data = doc.data() as Omit<Tag, "id">; // Ensure "id" is not in data
      return { id: doc.id, ...data }; // Merge doc.id separately
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
    } catch (error) {
        console.error("Error deleting reservation:", error);
    }
};
export const getTagsByNotes = async (
    userId: string,
    noteId: string
  ): Promise<Tag[]> => {
    const reservationsRef = collection(db, "reservations");
    const q = query(reservationsRef, where("userId", "==", userId), where("noteId", "==", noteId));
  
    try {
      const querySnapshot = await getDocs(q);
      const tags: Tag[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Tag, "id">; // Ensure "id" is not in data
        return { id: doc.id, ...data }; // Merge doc.id separately
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
        console.log("Reservation updated successfully!");
    } catch (error) {
        console.error("Error updating reservation:", error);
    }
}