import { ReactNode } from "react";



export default function NewsLayout({
  children,
}: {
  children: ReactNode;
}) {
 

  

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar (conditionally visible based on route) */}

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden">{children}</main>
    </div>
  );
}
