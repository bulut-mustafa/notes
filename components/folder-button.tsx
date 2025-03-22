'use client'
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function FolderButton({ name, icon, count, link, isOpen, onSelect }: { name: string, icon: string, count: number, link: string, isOpen: boolean, onSelect: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    // Check if the current pathname matches the button link
    const isActive = pathname.includes(link);
    const handleRoute = () => {
        onSelect();
        router.push(link);
    };
    return (
        <li className="w-full list-none">
            <button
                className={`group flex w-full rounded-xl text-sm items-center p-1 transition-colors cursor-pointer
                    ${isActive ? "bg-[#fff2ee] font-semibold text-[#856559]" : "text-[#a9a9a9] hover:bg-gray-100"}
                `}
                onClick={handleRoute} 
            >
                <Image
                    src={`/folders/${icon}${isActive ? "-active" : ""}.svg`}
                    width={28}
                    height={28}
                    alt={name}
                    className="min-w-[32px] min-h-[32px]"
                />
                <p className={`text-nowrap ${!isOpen ? "hidden" : ""} ml-2`}>
                    {name}
                </p>

                {isOpen && (
                    <span className={`ml-auto mr-2 text-sm rounded-xl p-1 transition-colors
                        ${isActive ? "bg-[#fce4dc] text-[#856559]" : "bg-[#f3f3f3] text-[#a9a9a9]"}
                    `}>
                        {count}
                    </span>
                )}
            </button>
        </li>
    );
}
