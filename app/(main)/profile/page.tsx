'use client';
import { useAuth } from "@/context/auth-context";
import ProfileHead from "@/components/profile/profile-head";
import AccountSecurity from "@/components/profile/account-security";
import Support from "@/components/profile/support";
import Image from "next/image";

export default function ProfilePage() {
    const { user, loading } = useAuth();

    return (
        <div className="relative px-4 py-6 md:px-12 overflow-hidden min-h-screen">
            {/* Background Image */}
            <div className="hidden md:block absolute top-1/3 right-0 transform -translate-y-1/2 opacity-30 z-[-1] pointer-events-none">
                <Image
                    src="/profile-undraw.svg"
                    alt="Profile Background"
                    width={500}
                    height={500}
                    className="w-[300px] lg:w-[400px] h-auto object-contain"
                    priority
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row md:items-start gap-8 relative z-10">
                <div className="flex-1 space-y-8">
                    <ProfileHead user={user} uid={user?.uid} userInfoLoading={loading} />
                    <AccountSecurity user={user} uid={user?.uid} userInfoLoading={loading} />
                    <Support />
                </div>
            </div>
        </div>
    );
}
