import { authUser } from '@/lib/types';

interface UserDropdownProps {
    loading: boolean;
    isOpen: boolean;
    user: authUser;
    logOut: () => void;
}
export default function UserDropdown(userInfo: UserDropdownProps) {
    return (
        <div className="flex items-center gap-3 py-2 border-b border-slate-200">
            <div className="min-w-12 min-h-12 rounded-full bg-gray-300"></div>
            {userInfo.isOpen && (
                <div>
                    <h3 className="font-semibold">{userInfo.user.displayName}</h3>
                    <p className="text-sm text-gray-500">{userInfo.user.email}</p>
                </div>
            )}
        </div>
    );
}
