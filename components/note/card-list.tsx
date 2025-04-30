"use client";
import NoteCard from "./note-card"; 
import { useNotes } from "@/context/notes-context";
import Image from "next/image";
export  function NoteCardSkeleton() {
    return (
      <div className="flex flex-col gap-2 p-4 text-sm border rounded-lg bg-[#fafafa] animate-pulse">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
  
        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full"></div>
  
        {/* Tags Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="h-4 w-25 bg-gray-300 rounded"></div>
          <div className="h-4 w-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }


export default function CardList() {
    const { filteredNotes, loading } = useNotes();


    if (loading) {
        return (
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => <NoteCardSkeleton key={i} />)}
          </div>
        );
      }
    if (filteredNotes.length === 0) return <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
    <Image src="/add-note.svg" alt="Add note" className="opacity-80" width={200} height={200} />
    <h1 className="text-gray-400 text-lg">You don&apos;t have any notes.</h1>
  </div>;

    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-full">
            {filteredNotes.map((note) => (
                <NoteCard key={note.id} id={note.id} note={note} />
            ))}
        </div>
    );
}
