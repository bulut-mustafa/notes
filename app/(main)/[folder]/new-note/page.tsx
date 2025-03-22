import ImagePicker from "@/components/image-picker";
export default function NewNotePage() {
    return (
        <div className="flex items-center w-full justify-center">
            <div className="w-full p-4 space-y-4">
                <h1 className="text-2xl font-semibold">New Note</h1>
                <form className="space-y-4">
                    <ImagePicker name="coverImage" />
                    <div>
                        <input type="text" id="title" placeholder="Title" name="title" className="w-full border border-slate-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#956e60]" />
                    </div>
                    <div>
                        <textarea id="content" placeholder="Write your note" name="content" rows={6} className="mt-1 p-2 w-full border border-slate-200 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#956e60] sm:text-sm" />
                    </div>
                    <div>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}