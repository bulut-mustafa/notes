import Sidebar from "@/components/sidebar";
import { TagsProvider } from "@/context/tag-context";
import { AuthProvider } from "@/context/auth-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <TagsProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </TagsProvider>
    </AuthProvider>
  );
}
