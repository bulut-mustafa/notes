// import { authUser } from "@/lib/types"
// interface SupportProps {
//     user: authUser | null;
//     uid: string | undefined;
//     userInfoLoading: boolean;
// }

export default function Support() {
    return (
        <div className="mt-8 w-full">

            <h1 className="text-lg font-bold w-full border-b border-slate-200 mb-4" >Support</h1>
            <div className="flex flex-col gap-4">
                <div className="flex items-center w-full justify-between  gap-2 mt-4">
                    <div className="flex flex-col gap-2">
                        <p>Need help?</p>
                        <p className="text-xs text-gray-500">Reach out to me for any inquiries.</p>
                    </div>
                    <button className="border border-[#937b70] text-sm text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-[#937b70] transition duration-200">
                        Email
                    </button>
                </div>
                <div className="flex items-center w-full justify-between  gap-2 mt-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-red-400">Delete my account</p>
                        <p className="text-xs text-gray-500">Permanently delete the account and remove all the notes.</p>
                    </div>
                    <button className="border border-[#937b70] text-sm text-gray-600 hover:text-white px-4 py-2 rounded-md hover:bg-[#937b70] transition duration-200">
                        {">"}
                    </button>
                </div>
            </div>

        </div>
    )
}