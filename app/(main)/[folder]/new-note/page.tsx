"use client";

import ImagePicker from "@/components/new-note/image-picker";
import ButtonBar from "@/components/new-note/button-bar";
import NoteTag from "@/components/new-note/note-tag";
import { useState } from "react";
import { useTags } from "@/context/tag-context";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/new-note/text-editor";


export default function NewNotePage() {
  const { tags } = useTags();
  const router = useRouter();
  const { addNote } = useNotes();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [noteFormData, setNoteFormData] = useState({
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
    setNoteFormData({ content: "", image: [], tags: [], archived: false, isDeleted: false, newsAttached: [], isFavorite: false });
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
    <div className="flex flex-col  w-full h-[100dvh] overflow-hidden"> {/* Full height page */}


      <form className="flex-1 overflow-auto p-2 space-y-4" onSubmit={handleSubmit}>
        <div className="sticky mb-2 z-10 bg-white ">
          <ButtonBar
            tags={tags}
            selectedTags={noteFormData.tags}
            setSelectedTags={handleTagChange}
          />
        </div>
        <ImagePicker
          name="coverImage"
          value={selectedFile}
          onChange={setSelectedFile}
        />

        {noteFormData.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {noteFormData.tags.map((tagId) => {
              const tag = tags.find((t) => t.id === tagId);
              return tag ? <NoteTag key={tag.id} name={tag.name} /> : null;
            })}
          </div>
        )}

        <RichTextEditor
          content={noteFormData.content}
          onChange={(newContent) =>
            setNoteFormData((prev) => ({ ...prev, content: newContent }))
          }
        />
      </form>
    </div>
  );
}
