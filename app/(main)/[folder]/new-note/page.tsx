"use client";

import ImagePicker from "@/components/new-note/image-picker";
import ButtonBar from "@/components/new-note/button-bar";
import NoteTag from "@/components/new-note/note-tag";
import { useState  } from "react";
import { useTags } from "@/context/tag-context";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
    const { tags } = useTags();
    const router = useRouter();
    const { addNote } = useNotes();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [noteFormData, setNoteFormData] = useState({
        title: "",
        content: "",
        image: [] as string[],
        tags: [] as string[],
        archived: false,
        isDeleted: false,
        newsAttached: [],
        isFavorite: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let uploadedImage = "";
    
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
    
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");
    
            uploadedImage = data.fileName; // Store uploaded image filename
        }
    
        // Only include the image field if there's an uploaded file
        const updatedFormData = {
            ...noteFormData,
            image: uploadedImage ? [uploadedImage] : [],
        };
    
        const newNote = await addNote(updatedFormData);
    
        // Reset form state
        setNoteFormData({ title: "", content: "", image: [], tags: [], archived: false, isDeleted: false, newsAttached: [], isFavorite: false });
        setSelectedFile(null);
        router.push(`/notes/${newNote?.id}`);
    };
    
    
    

    const handleTagChange = (selectedTags: string[]) => {
        setNoteFormData((prev) => ({
            ...prev,
            tags: selectedTags,
        }));
    };

    return (
        <div className="flex items-center w-full justify-center">
            <div className="w-full p-2 space-y-4">
                <ButtonBar
                    tags={tags}
                    selectedTags={noteFormData.tags}
                    setSelectedTags={handleTagChange}
                />

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <ImagePicker
                        name="coverImage"
                        value={selectedFile}
                        onChange={setSelectedFile}
                    />

                    <div className="flex gap-2 flex-wrap">
                        {noteFormData.tags.map((tagId) => {
                            const tag = tags.find((t) => t.id === tagId);
                            return tag ? <NoteTag key={tag.id} name={tag.name} /> : null;
                        })}
                    </div>

                    <div>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            name="title"
                            className="w-full border-b border-slate-200 p-2 focus:outline-none"
                            value={noteFormData.title}
                            onChange={(e) =>
                                setNoteFormData({ ...noteFormData, title: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <textarea
                            id="content"
                            placeholder="Write your note"
                            name="content"
                            rows={6}
                            className="mt-1 p-2 w-full border-b border-slate-200 focus:outline-none sm:text-sm"
                            value={noteFormData.content}
                            onChange={(e) =>
                                setNoteFormData({ ...noteFormData, content: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-slate-200 shadow-sm text-sm font-medium rounded-md text-[#856559] active:outline-none active:ring-2 active:ring-[#956e60]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
