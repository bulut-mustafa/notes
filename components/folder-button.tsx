import Image from "next/image";

export default function FolderButton() {
    return (
        <li className="w-full list-none">
            <button className="group flex w-full rounded-xl active:bg-[#fff2ee] text-lg active:font-semibold active:text-[#856559] text-[#a9a9a9] items-center p-2">
                <Image
                    src={`/folders/all-notes-active.svg`}
                    width={48}
                    height={48}
                    alt={`favorite`}
                    className="m-2"
                />
                <p>All Notes</p>
                <span className="ml-auto mr-2 bg-[#f3f3f3] text-[#a9a9a9] rounded-xl p-2 group-active:bg-[#fce4dc] group-active:text-[#856559]">
                    24
                </span>
            </button>
        </li>
    );
}
