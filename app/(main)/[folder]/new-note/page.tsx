'use client';

import ImagePicker from "@/components/new-note/image-picker";
import ButtonBar from "@/components/new-note/button-bar";
export default function NewNotePage() {
    return (
        <div className="flex items-center w-full justify-center">
            <div className="w-full p-2 space-y-4">
                <ButtonBar />
                <form className="space-y-4">
                    <ImagePicker name="coverImage" />
                    <div>
                        <input type="text" id="title" placeholder="Title" name="title" className="w-full border-b border-slate-200 p-2 focus:outline-none" />
                    </div>
                    <div>
                        <textarea id="content" placeholder="Write your note" name="content" rows={6} className="mt-1 p-2 w-full border-b border-slate-200 focus:outline-none  sm:text-sm" />
                    </div>
                    <div>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-slate-200 shadow-sm text-sm font-medium rounded-md text-[#856559] active:outline-none active:ring-2 active:ring-[#956e60]">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}