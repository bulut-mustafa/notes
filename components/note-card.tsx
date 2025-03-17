import DateTag from "./date-tag"
export default function NoteCard() {
    return (
        <div className="flex group flex-col bg-[#fafafa] active-bg:fef p-4">
            <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-[#727272] group-active:text-[#856559]">
                    Title of the note
                </p>
            </div>
            <p className="text-[#a9a9a9] group-active:text-[#868282]">
                Some content for the note
            </p>
            <DateTag />
        </div>
    )
}