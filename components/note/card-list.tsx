"use client";
import { useEffect, useState } from "react";
import { fetchNotesByFolder } from "@/lib/actions";
import NoteCard from "./note-card";
import { Note } from "@/lib/types";
import { useAuth } from "@/context/auth-context";

export  function NoteCardSkeleton() {
    return (
      <div className="flex flex-col gap-2 p-4 text-sm border rounded-lg bg-[#fafafa] animate-pulse">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
  
        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  
        {/* Tags Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }


export default function CardList({ folder }: { folder: string }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching notes for folder:", folder, user?.uid);
        const fetchNotes = async () => {
            try {
                if (user?.uid) {
                    const fetchedNotes = await fetchNotesByFolder(user.uid, folder);
                    setNotes(fetchedNotes);
                } else {
                    console.error("User ID is undefined. Cannot fetch notes.");
                }
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [folder]);

    if (loading) return <NoteCardSkeleton />; // Show skeleton while loading
    if (notes.length === 0) return <p>No notes found. Add one.</p>;

    return (
        <div className="flex flex-col gap-2">
            {notes.map((note) => (
                <NoteCard key={note.id} id={note.id} title={note.title} description={note.content} />
            ))}
        </div>
    );
}
