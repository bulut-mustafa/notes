import Image from "next/image"
export default function DateTag(){
    return (
        <div className="rounded-lg p-2 bg-[#f3f3f3] text-[#a4a4a4] group-active:bg-[#fce4dc] group-active:text-[#856599] flex items-center">
            <Image
                src={`/tags/date-active.svg`}
                width={32}
                height={32}
                alt={`Last Updated`}
                className=""
            />
            <p>17, March 2025 - 4:46PM</p>
        </div>
    )
}