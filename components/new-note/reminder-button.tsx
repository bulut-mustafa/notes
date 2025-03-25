'use client';
import Image from "next/image"
export default function Button(
    {icon, onClick, className}:
    {icon: string, onClick: () => void, className: string}
){
    return (
        <button className={`${className} rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-[#9f857a] rounded-lg p-1`}>
            <Image
                src={`/buttons/${icon}.svg`}
                width={28}
                height={28}
                alt={`favorite`}
                className={``}
                onClick={onClick}
            />
            
        </button>
    )
}