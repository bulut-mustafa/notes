"use client";

import ImagePicker from "@/components/new-note/image-picker";
import ButtonBar from "@/components/new-note/button-bar";
import NoteTag from "@/components/new-note/note-tag";
import { useState } from "react";
import { useTags } from "@/context/tag-context";
import { useNotes } from "@/context/notes-context";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/new-note/text-editor";
import toast from "react-hot-toast";

export default function NewNotePage() {
  const { tags } = useTags();
  const router = useRouter();
  const { addNote } = useNotes();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  
    // =======  VALIDATION START =======
    const trimmedContent = noteFormData.content.trim();
  
    if (trimmedContent.length === 0) {
      toast.error("Note content cannot be empty.");
      return;
    }
  
    const invalidTags = noteFormData.tags.filter(tagId => !tags.find(t => t.id === tagId));
    if (invalidTags.length > 0) {
      toast.error("Some selected tags are invalid.");
      return;
    }
    // ====== END =====
    setIsSubmitting(true);
  
    try {
      let uploadedImage = "";
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
  
        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Image upload failed");
  
        uploadedImage = data.fileName;
      }
  
      const updatedFormData = {
        ...noteFormData,
        content: trimmedContent,  // use trimmed version
        image: uploadedImage ? [uploadedImage] : [],
      };
  
      const newNote = await addNote(updatedFormData);
  
      if (!newNote) {
        toast.error("Failed to create note. Please try again.");
        return;
      }
  
      toast.success("Note created successfully!");
  
      setNoteFormData({
        content: "",
        image: [],
        tags: [],
        archived: false,
        isDeleted: false,
        newsAttached: [],
        isFavorite: false,
      });
      setSelectedFile(null);
      router.push(`/notes/${newNote.id}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
        toast.error(error.message || "Something went wrong. Please try again.");
      } else {
        console.error("Unknown error submitting form:", error);
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  




  const handleTagChange = (selectedTags: string[]) => {
    setNoteFormData((prev) => ({
      ...prev,
      tags: selectedTags,
    }));
  };

  return (
    <div className="flex flex-col  w-full h-[100dvh] overflow-hidden">


      <form className="flex-1 overflow-auto p-2 space-y-4" onSubmit={handleSubmit}>
        <ButtonBar
            tags={tags}
            selectedTags={noteFormData.tags}
            setSelectedTags={handleTagChange}
            isSubmitting={isSubmitting}
          />
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
