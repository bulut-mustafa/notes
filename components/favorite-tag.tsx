import Image from "next/image"
export default function FavoriteTag(){
    return (
        <div className="rounded-lg p-2 bg-[#f3f3f3] text-[#a4a4a4] group-hover:bg-[#fce4dc] group-hover:text-[#856559] flex items-center">
            <Image
                src={`/buttons/heart.svg`}
                width={16}
                height={16}
                alt={`favorite`}
                className=""
            />
        </div>
    )
}