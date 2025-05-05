import Image from "next/image"
import { useRouter, usePathname } from "next/navigation";
import { New } from "@/lib/types";
export default function NewCard({id, newItem}: {id: string, newItem: New}) {
      const router = useRouter();
      const pathname = usePathname();
    
      const isActive = pathname.includes(id);

      const handleClick = () => {
        router.push(`/news/${id}`);
      };
    return (
        <>
            <div
                onClick={handleClick}
                className={`flex group rounded-lg flex-col gap-2 p-2 text-xs cursor-pointer transition-all border bg-[#fafafa] hover:bg-[#fef6f4] 
      ${isActive ? "border-2 border-[#d6c2bc] bg-[#fef6f4]" : "border border-transparent"}`}
            >
                <div className="flex justify-between items-center justify-between">
                    <p
                        className={`text-base font-semibold truncate ${isActive ? "text-[#4b4744]" : "text-[#a9a9a9]"
                            }`}
                    >

                    </p>
                </div>


            </div>
        </>
    )
}