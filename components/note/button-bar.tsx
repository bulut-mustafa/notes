'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmationModal from "../confirmation-modal";
import { Note } from "@/lib/types";
import Button from "../button";
import { addNoteToFav, archiveNote, deleteNote as deleteDb, moveToTrash } from "@/lib/actions";
import { useNotes } from "@/context/notes-context";
import { useTags } from "@/context/tag-context";
import { useRouter, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { updateNote } from "@/lib/actions";
import Image from "next/image";
import toast from "react-hot-toast";
export default function ButtonBar({
    note,
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onToggleAI,
}: {
    note: Note;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onToggleAI: () => void;
}) {
    const pathname = usePathname();
    const [uploading, setUploading] = useState(false);
    const folder = pathname.split("/")[1];
    const { updateNoteState, deleteNote } = useNotes();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const { tags } = useTags();
    async function handleFavorite() {
        const isFavorite = note.isFavorite;
        
        const result = await addNoteToFav(note.id, isFavorite);
      
        if (result.success) {
          updateNoteState(note.id, { isFavorite: !isFavorite });
          toast.success(
            isFavorite ? "Removed from favorites" : "Added to favorites",
            {
              icon: isFavorite ? "❌" : "✅",
              duration: 2000,
              position: "top-right",
              style: {
                background: isFavorite ? "#f8d7da" : "#d4edda",
                color: isFavorite ? "#721c24" : "#155724",
              },
            }
          );
          console.log("Favorite toggled");
        } else {
          toast.error(result.message || "An error occurred", {
            duration: 2000,
            position: "top-right",
          });
          console.error("Failed to toggle favorite");
        }
      }

    async function handleAddTag(id: string) {
        const newTags = [...(note.tags || []), id];
        const result = await updateNote(note.id, { tags: newTags });
        if(result.success) {
            updateNoteState(note.id, { tags: newTags });
            toast.success("Tag added", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
        }
        else{
            toast.error(result.message || "An error occurred", {
                duration: 2000,
                position: "top-right",
            });
            console.error("Failed to add tag");
        }
        
    }

    function handleArchive() {
        archiveNote(note.id, true);
        toast.success("Moved to Archive", {
            duration: 2000,
            position: "top-right",
            style: {
                background: "#d4edda",
                color: "#155724",
            },
        });
        router.push("/notes"); 
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handleUnarchive() {
        archiveNote(note.id, false);
        toast.success("Moved to Notes", {
            duration: 2000,
            position: "top-right",
            style: {
                background: "#d4edda",
                color: "#155724",
            },
        });
        router.push("/archived");
        setTimeout(() => deleteNote(note.id), 100);
    }


    function handleDelete() {
        moveToTrash(note.id, true);
        toast.success("Moved to Trash", {
            duration: 2000,
            position: "top-right",
            style: {
                background: "#d4edda",
                color: "#155724",
            },
        });
        router.push("/notes");
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handleRestore() {
        moveToTrash(note.id, false);
        toast.success("Note Restored", {
            duration: 2000,
            position: "top-right",
            style: {
                background: "#d4edda",
                color: "#155724",
            },
        });
        router.push("/deleted");
        setTimeout(() => deleteNote(note.id), 100);
    }

    function handlePermanentRemove() {
        deleteDb(note.id);
        toast.success("Note Deleted Permanently", {
            duration: 2000,
            position: "top-right",
            style: {
                background: "#d4edda",
                color: "#155724",
            },
        });
        router.push("/deleted");
        setTimeout(() => deleteNote(note.id), 100);
    }
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            let uploadedImage = "";

            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            uploadedImage = data.fileName;
            const newImages = [...(note.image || []), uploadedImage];

            const result = await updateNote(note.id, { image: newImages });
            if(result.success) {
                updateNoteState(note.id, { image: newImages });
            toast.success("Image uploaded successfully", {
                duration: 2000,
                position: "top-right",
                style: {
                    background: "#d4edda",
                    color: "#155724",
                },
            });
            }
            else{
                toast.error(result.message || "An error occurred", {
                    duration: 2000,
                    position: "top-right",
                });
                console.error("Failed to add image");
            }
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setUploading(false);
        }
    }


    return (
        <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-2  pb-2 px-2 md:px-4 border-b border-slate-200 w-max min-w-full">
                <Button
                    icon="back"
                    onClick={() => router.push(`/${folder}`)}
                    className="md:hidden"
                />

                {folder === "deleted" ? (
                    <>
                        <Button
                            icon="remove"
                            onClick={() => setShowConfirmModal(true)}
                            className="border-slate-200"
                        />
                        <Button
                            icon="restore" 
                            onClick={handleRestore}
                            className="border-slate-200"
                        />
                    </>
                ) : (
                    <>
                        <Button
                            icon="heart"
                            onClick={handleFavorite}
                            className={`${note.isFavorite ? "border-[#9f857a] bg-[#fff5f2]" : "border-slate-200"
                                }`}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-[#9f857a] p-1">
                                    <Image
                                        src={`/buttons/new-tag.svg`}
                                        width={20}
                                        height={20}
                                        alt="add tag"
                                    />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Add Tag</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    {tags
                                        .filter((tag) => !note.tags?.includes(tag.id))
                                        .map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="flex items-center px-2 py-1 gap-2 rounded-md cursor-pointer hover:bg-[#f6f1ef]"
                                                onClick={() => handleAddTag(tag.id)}
                                            >
                                                {tag.name}
                                            </div>
                                        ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {uploading ? (
                            <button
                                disabled
                                className="flex items-center gap-2 border px-3 py-1.5 rounded-md text-sm text-[#937b70] cursor-not-allowed bg-[#f6f1ef] border-[#937b70]"
                            >
                                <svg
                                    className="w-5 h-5 animate-spin text-[#937b70]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 28 28"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="11"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8z"
                                    ></path>
                                </svg>
                            </button>
                        ) : (
                            <>
                                <Button
                                    icon="add-image"
                                    className="border-slate-200 cursor-default"
                                    asLabel
                                    htmlFor="file-upload"
                                />
                                <input
                                    type="file"
                                    id="file-upload"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </>
                        )}
                        <Button
                            icon={note.archived ? "unarchive" : "archive"}
                            onClick={note.archived ? handleUnarchive : handleArchive}
                            className="border-slate-200"
                        />
                        <Button
                            icon="trash"
                            onClick={handleDelete}
                            className="border-slate-200"
                        />
                        <div className="flex gap-2 ml-auto">

                            {!isEditing ? (
                                <>
                                    <Button
                                        icon="sparkles"
                                        onClick={onToggleAI}
                                        className="border-slate-200"
                                    />
                                    <Button
                                        icon="edit"
                                        onClick={onEdit}
                                        className="border-slate-200"
                                    />
                                </>

                            ) : (<>
                                <Button
                                    icon="save"
                                    onClick={onSave}
                                    type="button"
                                    className="border-slate-200"
                                    asLabel={false}
                                />
                                <Button
                                    icon="cancel"
                                    onClick={onCancel}
                                    type="button"
                                    className="border-slate-200"
                                    asLabel={false}
                                />
                            </>)}
                        </div>
                    </>
                )}

                {showConfirmModal && (
                    <ConfirmationModal
                        text="Delete this note permanently?"
                        onClose={() => setShowConfirmModal(false)}
                        onConfirm={handlePermanentRemove}
                    />
                )}
            </div>
        </div>
    );

}
