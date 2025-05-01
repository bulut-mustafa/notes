"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Note } from "@/lib/types";
import { useNotes } from "@/context/notes-context";
import { updateNote } from "@/lib/actions";
export default function ImageBar({ note }: { note: Note }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const {updateNoteState} = useNotes();
  if (!note.image || note.image.length === 0) return null;

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };
  const handleRemoveImage = async (image: string) => {
    try{
        const formData = new FormData();
        formData.append("image", image);

        const response = await fetch("/api/delete", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if(!response.ok) {
          throw new Error(data.error || "Failed to delete image");
        }

        const updatedImages = note.image.filter((img) => img !== image);
        updateNote(note.id, { image: updatedImages });
        updateNoteState(note.id, { image: updatedImages });
    } catch (error) {
        console.error("Upload failed:", error);
    }
  }
  const closeModal = () => setModalOpen(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % note.image.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + note.image.length) % note.image.length);
  };

  const isSingleImage = note.image.length === 1;

  return (
    <>
      <div className="mb-4">
        <div className="flex md:hidden gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          {note.image.map((img, i) => (
            <div
              key={i}
              className="relative group min-w-full snap-start cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                alt={`Note Image ${i + 1}`}
                width={800}
                height={500}
                className="w-full h-auto object-contain"
                onClick={() => openModal(i)}
              />
              <button
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white p-1 rounded-full"
                onClick={() => handleRemoveImage(img)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div
          className="hidden md:grid gap-2"
          style={{
            gridTemplateColumns: isSingleImage
              ? 'repeat(1, minmax(100%, auto))'
              : {
                  2: 'repeat(2, minmax(150px, 1fr))',
                  3: 'repeat(3, minmax(150px, 1fr))',
                  more: 'repeat(auto-fill, minmax(150px, 1fr))',
                }[note.image.length] || 'repeat(auto-fill, minmax(150px, 1fr))',
          }}
        >
          {note.image.map((img, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg bg-gray-100 aspect-video"
            >
              <Image
                src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                alt={`Note Image ${i + 1}`}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                onClick={() => openModal(i)}
              />
              <button
                className="absolute bottom-2 cursor-pointer right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 hover:bg-black/60 text-white p-1 rounded-full"
                onClick={() => handleRemoveImage(img)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Part */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-[80vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
            >
              <X size={28} />
            </button>

            <Image
              src={`https://notes-app-note-images.s3.amazonaws.com/${note.image[currentIndex]}`}
              alt={`Modal Image ${currentIndex + 1}`}
              width={400}
              height={200}
              className="w-full h-auto object-contain rounded-lg"
            />
            {note.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-0 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-r"
                >
                  <ArrowLeft size={28} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-0 -translate-y-1/2 text-white bg-black/30 hover:bg-black/60 p-2 rounded-l"
                >
                  <ArrowRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
