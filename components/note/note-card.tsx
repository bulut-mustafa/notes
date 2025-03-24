"use client";
import { useRouter, usePathname } from "next/navigation";
import DateTag from "./date-tag";
import FavoriteTag from "./favorite-tag";

export default function NoteCard({
    id, title, description, }: {
        id: string; title: string; description: string;
    }) {
    const router = useRouter();
    const pathname = usePathname();

    const folder = pathname.split("/")[1];
    const isActive = pathname.includes(id);

    const handleClick = () => {
        router.push(`/${folder}/${id}`);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex group rounded-lg flex-col gap-2 p-4 text-sm cursor-pointer transition-all border bg-[#fafafa] hover:bg-[#fef6f4] 
            ${isActive ? 'border-2 border-[#d6c2bc] bg-[#fef6f4]' : 'border border-transparent'}`}
        >
            <div className="flex justify-between items-center">
                <p className={`text-lg font-semibold text-[#4b4744] truncate ${isActive && 'text-[#8f756f]'}`}>{title}</p>
            </div>
            <p className={`text-xs truncate ${isActive ? 'text-[#4b4744]' :'text-[#a9a9a9]'}`}>{description}</p>
            <div className="flex gap-2 ">
                <DateTag isActive={isActive} />
                <FavoriteTag isActive={isActive} />
            </div>
        </div>
    );
}
