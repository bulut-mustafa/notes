import Image from "next/image"
export default function NoteTag ({name, id, onRemove}: {name: string, id: string, onRemove: (id: string) => void}) {

    return (
        <>
            <div className="group flex gap-2 px-2 py-1 border border-slate-200 dark:border-border rounded-lg transition-all duration-200">
                <Image
                    src={`/tag.svg`}
                    width={20}
                    height={20}
                    alt={`tag`}
                    className={``}/>

                <p className="text-sm text-nowrap">{name}</p>
                <button
                    className="block md:hidden group-hover:inline-block px-1 ml-auto rounded-full text-sm text-[#937b70] hover:bg-slate-200 dark:hover:bg-[#3b3b3b] transition-opacity duration-200"
                    onClick={() => onRemove(id)}
                >
                    X
                </button>
            </div>
        </>
    )
}