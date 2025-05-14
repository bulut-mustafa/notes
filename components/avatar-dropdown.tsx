import { authUser } from '@/lib/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/context/theme-context';
interface UserDropdownProps {
    loading: boolean;
    isOpen: boolean;
    user: authUser;
    logOut: () => void;
}

export default function UserDropdown(userInfo: UserDropdownProps) {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="flex items-center gap-3">

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="min-w-8 min-h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                            {userInfo.user.displayName?.charAt(0).toUpperCase()}
                        </div>
                        {userInfo.isOpen && (<h3 className="text-sm font-semibold">{userInfo.user.displayName}</h3>)}

                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        <div className='flex items-center gap-2'>
                            <div className="min-w-8 min-h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                                {userInfo.user.displayName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">{userInfo.user.displayName}</h3>
                                <p className="text-xs text-gray-500">{userInfo.user.email}</p>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className='text-sm font-semibold text-gray-400'>
                        <DropdownMenuItem>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src="/buttons/profile.svg"
                                    alt="Profile"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                />
                                <Link href={'/profile'} className="">Account</Link>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div onClick={toggleTheme} className='flex items-center gap-2'>
                                <Image
                                    src="/buttons/theme.svg"
                                    alt="Theme"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                />
                                <p>Theme: <span className='capitalize'>{theme}</span></p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={userInfo.logOut}>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src="/buttons/logout.svg"
                                    alt="LogOut"
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                />
                                <span className="">Log Out</span>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}
