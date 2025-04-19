import { authUser } from '@/lib/types';

interface UserDropdownProps {
    loading: boolean;
    isOpen: boolean;
    user: authUser;
    logOut: () => void;
}
export default function UserDropdown(userInfo: UserDropdownProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="min-w-8 min-h-8 rounded-full bg-gray-300"></div>
            {userInfo.isOpen && (
                <div>
                    <h3 className="text-sm font-semibold">{userInfo.user.displayName}</h3>
                    <p className="text-xs text-gray-500">{userInfo.user.email}</p>
                </div>
            )}
        </div>
    );
}
