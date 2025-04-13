import Image from "next/image"
export default function NoteTag ({name, id, onRemove}: {name: string, id: string, onRemove: (id: string) => void}) {

    return (
        <>
            <div className="flex gap-2 px-2 py-1 border border-slate-200 rounded-lg">
                <Image
                    src={`/tag.svg`}
                    width={20}
                    height={20}
                    alt={`tag`}
                    className={``}/>

                <p className="text-sm text-nowrap">{name}</p>
                <button
                    className="px-1 ml-auto rounded-full text-sm text-[#937b70] hover:bg-slate-200"
                    onClick={() => onRemove(id)}
                >
                    X
                </button>
            </div>
        </>
    )
}