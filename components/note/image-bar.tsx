"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

export default function ImageBar({ noteImages }: { noteImages: string[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!noteImages || noteImages.length === 0) return null;

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % noteImages.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + noteImages.length) % noteImages.length);
    };

    const isSingleImage = noteImages.length === 1;

    return (
        <>
            <div className="mb-4">
                {/* Small screens: horizontal scroll carousel */}
                <div className="flex md:hidden gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {noteImages.map((img, i) => (
                        <div
                            key={i}
                            className="min-w-full snap-start cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                            onClick={() => openModal(i)}
                        >
                            <Image
                                src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                                alt={`Note Image ${i + 1}`}
                                width={800}
                                height={500}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Medium and up: grid layout */}
                <div
                    className="hidden md:grid gap-2"
                    style={{
                        gridTemplateColumns: isSingleImage
                            ? 'repeat(1, minmax(100%, auto))'
                            : {
                                2: 'repeat(2, minmax(150px, 1fr))',
                                3: 'repeat(3, minmax(150px, 1fr))',
                                more: 'repeat(auto-fill, minmax(150px, 1fr))',
                            }[noteImages.length] || 'repeat(auto-fill, minmax(150px, 1fr))',
                    }}
                >
                    {noteImages.map((img, i) => (
                        <div
                            key={i}
                            className="cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-video"
                            onClick={() => openModal(i)}
                        >
                            <Image
                                src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                                alt={`Note Image ${i + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>



            {/* Modal Part (remains the same) */}
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
                            src={`https://notes-app-note-images.s3.amazonaws.com/${noteImages[currentIndex]}`}
                            alt={`Modal Image ${currentIndex + 1}`}
                            width={1200}
                            height={800}
                            className="w-full h-auto object-contain rounded-lg"
                        />
                        {noteImages.length > 1 && (
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