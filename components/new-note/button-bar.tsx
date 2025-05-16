"use client";

import Button from "../button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Tag } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ButtonBarProps {
    tags: Tag[];
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    isSubmitting: boolean;
}

export default function ButtonBar({
    tags,
    selectedTags,
    setSelectedTags,
    isSubmitting
}: ButtonBarProps) {
    const router = useRouter();
    const handleTagToggle = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(selectedTags.filter((id) => id !== tagId));
        } else {
            setSelectedTags([...selectedTags, tagId]);
        }
    };

    return (
        <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-2  pb-2 px-2 md:px-4 w-max min-w-full">
                <Button
                    icon="back"
                    onClick={() => router.push("/notes")}
                    className=" md:hidden"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-[#5c3e44] dark:hover:border-[#9f857a] active:bg-[#fff5f2] active:border-[#9f857a] p-1">
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
                            {tags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="flex items-center px-2 py-1 gap-2"
                                >
                                    <Checkbox
                                        id={tag.id}
                                        checked={selectedTags.includes(tag.id)}
                                        onCheckedChange={() => handleTagToggle(tag.id)}
                                    />
                                    <label
                                        htmlFor={tag.id}
                                        className="text-sm font-medium leading-none"
                                    >
                                        {tag.name}
                                    </label>
                                </div>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button type="submit" disabled={isSubmitting} className="ml-auto rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-[#5c3e44] dark:hover:border-[#9f857a] active:bg-[#fff5f2] active:border-[#9f857a] p-1">
                    <Image
                        src={`/buttons/save.svg`}
                        width={20}
                        height={20}
                        alt="add tag"
                    />
                </button>
            </div>
        </div>
    );
}
