"use client";
import { useParams } from "next/navigation";
import { useNotes } from "@/context/notes-context";
import ButtonBar from "@/components/note/button-bar";
import Image from "next/image";

export default function NotePage() {
    const { noteId } = useParams();
    const { notes } = useNotes();
    const note = notes.find((n) => n.id === noteId);

    if (!note) {        
        return <p className="text-red-500 font-semibold">Note not found.</p>;
    }

    const renderImages = () => {
        const images = note.image;
        if (!images || images.length === 0) return null;

        const isEven = images.length % 2 === 0;

        if (images.length === 1) {
            return (
                <div className="w-full">
                    <Image
                        src={`https://notes-app-note-images.s3.amazonaws.com/${images[0]}`}
                        alt="Note Image"
                        width={800}
                        height={800}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
            );
        }

        if (images.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-2">
                    {images.map((img, i) => (
                        <Image
                            key={i}
                            src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                            alt={`Note Image ${i + 1}`}
                            width={600}
                            height={600}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    ))}
                </div>
            );
        }

        if (images.length === 3) {
            return (
                <div className="grid grid-cols-2 gap-2 h-[400px]">
                    <div className="h-full">
                        <Image
                            src={`https://notes-app-note-images.s3.amazonaws.com/${images[0]}`}
                            alt="Note Image 1"
                            width={600}
                            height={800}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="grid grid-rows-2 gap-2 h-full">
                        {images.slice(1).map((img, i) => (
                            <Image
                                key={i}
                                src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                                alt={`Note Image ${i + 2}`}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            );
        }

        // For 4+ images
        return (
            <div className={`grid gap-2 ${isEven ? 'grid-cols-2' : 'grid-cols-3 auto-rows-[200px]'}`}>
                {images.map((img, i) => {
                    if (!isEven && i === 0) {
                        return (
                            <div key={i} className="col-span-2 row-span-2">
                                <Image
                                    src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                                    alt={`Note Image ${i + 1}`}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        );
                    }
                    return (
                        <Image
                            key={i}
                            src={`https://notes-app-note-images.s3.amazonaws.com/${img}`}
                            alt={`Note Image ${i + 1}`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="p-2">
            <ButtonBar note={note} />
            <div className="p-4 space-y-4">
                {renderImages()}

                <h1 className="text-2xl font-bold text-black">{note.title}</h1>
                <p className="text-[#818181] leading-relaxed">{note.content}</p>
            </div>
        </div>
    );
}
