import { getFirestore, collection, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { NewsItem } from "@/lib/types"; // Adjust the import path as necessary
const db = getFirestore();
const auth = getAuth();

export async function saveNews(newsItem: NewsItem) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Not authenticated");

  const savedNewsRef = collection(db, "savedNews");

  // Optional: Check if already saved (prevent duplicates)
  const existingQuery = query(savedNewsRef,
    where("userId", "==", userId),
    where("newsId", "==", newsItem.id)
  );
  const existingSnap = await getDocs(existingQuery);
  if (!existingSnap.empty) return; // Already saved

  await addDoc(savedNewsRef, {
    userId,
    newsId: newsItem.id,
    noteId: null,
    title: newsItem.title,
    description: newsItem.description,
    source: newsItem.source,
    image: newsItem.image ?? null,
    url: newsItem.url,
    publishedAt: newsItem.publishedAt,
    createdAt: new Date(),
  });
}

export async function unsaveNews(newsId: string) {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("Not authenticated");

  const savedNewsRef = collection(db, "savedNews");

  const q = query(savedNewsRef,
    where("userId", "==", userId),
    where("newsId", "==", newsId)
  );

  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    deleteDoc(doc.ref);
  });
}

export async function getUserSavedNews() {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("Not authenticated");
  
    const savedNewsRef = collection(db, "savedNews");
    const q = query(savedNewsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  