import Image from "next/image"
export default function Button(){
    return (
        <button className="rounded-lg border border-slate-200 active:bg-[#fff5f2] active:border-2 active:border-[#9f857a] rounded-lg p-2">
            <Image
                src={`/buttons/heart.svg`}
                width={32}
                height={32}
                alt={`favorite`}
                className=""
            />
        </button>
    )
}