import NoteTag from "./note-tag";
import { useTags } from "@/context/tag-context";
import { Note } from "@/lib/types";
import {  RemoveTagToNote  } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
import toast from "react-hot-toast";
export default function TagBar({ tags, note }: { tags: string[], note: Note }) {
    const { tags: allTags, updateTagState } = useTags();
    const { updateNoteState } = useNotes();
    const handleRemoveTag = async (tagId: string) => {
        const updatedTags = tags.filter((id) => id !== tagId);
        const result = await RemoveTagToNote(note.id,tagId, updatedTags );
        if (result.success) {
            updateNoteState(note.id, { tags: updatedTags });
            updateTagState(tagId, { count: (allTags.find((tag) => tag.id === tagId)?.count || 0) - 1 });
            toast.success("Tag removed", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
        }
        else {
            toast.error("Failed to remove tag", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#f8d7da",
                    color: "#721c24",
                },
            });
        }
    };
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map((tagId) => {
                const tag = allTags.find((t) => t.id === tagId);
                return tag ? <NoteTag key={tag.id} name={tag.name} id={tag.id} onRemove={handleRemoveTag} /> : null;
            })}
        </div>
    );
}