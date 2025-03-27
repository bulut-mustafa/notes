"use client";

import ImagePicker from "@/components/new-note/image-picker";
import ButtonBar from "@/components/new-note/button-bar";
import NoteTag from "@/components/new-note/note-tag";
import { useState  } from "react";
import { useTags } from "@/context/tag-context";
import { useAuth } from "@/context/auth-context";
import { addNote } from "@/lib/actions";
export default function NewNotePage() {
    const { tags } = useTags();
    const {user} = useAuth();
    const [noteFormData, setNoteFormData] = useState({
        title: "",
        content: "",
        image: "",
        tags: [] as string[],
        status: "notes",
        newsAttached: [],
        isFavorite: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(noteFormData); // Here you'll get title, content, image, tags
        if (user?.uid) {
            addNote(user.uid, noteFormData);
        } else {
            console.error("User ID is undefined");
        }
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
                        value={noteFormData.image}
                        onChange={(image) => setNoteFormData({ ...noteFormData, image })}
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
