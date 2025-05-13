import { authUser } from "@/lib/types"
interface ProfileHeadProps {
    user: authUser | null;
    uid: string | undefined;
    userInfoLoading: boolean;
}
import Image from "next/image";
export default function ProfileHead({ user }: ProfileHeadProps) {
    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold w-full border-b border-slate-200 mb-4" >Account</h1>
            <div className="flex items-center ml-2 gap-2 mt-4">
                <div>
                    {user?.photoURL ? (
                        <Image
                            src={user?.photoURL}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-2 border-gray-300"
                        />
                    ): (
                        <div className="min-w-12 min-h-12 text-lg rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                                {user?.displayName?.charAt(0).toUpperCase()}
                        </div>
                    )}

                </div>
                <div>
                    <p className="text-md">{user?.displayName}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
            </div>

            <p className="w-fit mt-2 ml-2 text-xs text-blue-500 font-semibold cursor-pointer">
                Add Photo
            </p>
        </div>
    )
}