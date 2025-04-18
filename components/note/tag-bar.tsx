import NoteTag from "./note-tag";
import { useTags } from "@/context/tag-context";
import { Note } from "@/lib/types";
import { updateNote } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
export default function TagBar({ tags, note }: { tags: string[], note: Note }) {
    const { tags: allTags } = useTags();
    const { updateNoteState } = useNotes();
    const handleRemoveTag = async (tagId: string) => {
        const updatedTags = tags.filter((id) => id !== tagId);
        await updateNote(note.id, { tags: updatedTags });
        updateNoteState(note.id, { tags: updatedTags });
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