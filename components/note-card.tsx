"use client";
import { useRouter, usePathname } from "next/navigation";
import DateTag from "./date-tag";
import FavoriteTag from "./favorite-tag";

export default function NoteCard({
    id, title, description, }: {
    id: string; title: string; description: string; }) {
    const router = useRouter();
    const pathname = usePathname(); 

    const folder = pathname.split("/")[1];

    const handleClick = () => {
        router.push(`/${folder}/${id}`); 
    };

    return (
        <div onClick={handleClick} className="flex group rounded-lg flex-col p-4 text-sm cursor-pointer transition-all border bg-[#fafafa] border-transparent hover:bg-[#fef6f4] hover:border-[#e1c3bd] hover:border-2" >
            <div className="flex justify-between items-center">
                <p className="text-md font-medium text-[#727272] truncate">{title}</p>
            </div>
            <p className="text-xs text-[#a9a9a9] truncate">{description}</p>
            <div className="flex gap-2 mt-1">
                <DateTag />
                <FavoriteTag />
            </div>
        </div>
    );
}
