import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@heroui/react";
import { authUser } from '@/lib/types';

interface UserDropdownProps {
    user: authUser;
    loading: boolean;
    logOut: () => void;
}

// Skeleton Loader
const AvatarSkeleton = () => (
    <div className="flex items-center space-x-3 p-2 animate-pulse">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
            <div className="w-16 h-3 bg-gray-300 rounded mt-1"></div>
        </div>
    </div>
);

export default function AvatarDropdown(userInfo: UserDropdownProps) {
    if (userInfo.loading) {
        return <AvatarSkeleton />;
    }

    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        src: `https://timetogo-user-pictures.s3.amazonaws.com/${userInfo.user.photoURL}`,
                    }}
                    className="transition-transform"
                    name={userInfo.user.displayName}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{userInfo.user.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={userInfo.logOut}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
