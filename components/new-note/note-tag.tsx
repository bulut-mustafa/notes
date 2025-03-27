import Image from "next/image"
export default function NoteTag ({name}: {name: string}) {
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
            </div>
        </>
    )
}