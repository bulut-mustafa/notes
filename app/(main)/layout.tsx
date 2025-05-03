"use client";

import Sidebar from "@/components/sidebar";
import { TagsProvider } from "@/context/tag-context";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { NotesProvider } from "@/context/notes-context";
import { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);



  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Toaster position="top-center" />
        {children}
      </div>
    </div>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NotesProvider>
        <TagsProvider>
          <ProtectedLayout>{children}</ProtectedLayout>
        </TagsProvider>
      </NotesProvider>
    </AuthProvider>
  );
}
