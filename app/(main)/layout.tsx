import Sidebar from "@/components/sidebar";


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
  );
}
