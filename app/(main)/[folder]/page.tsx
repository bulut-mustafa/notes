'use client';

import React, {  useCallback } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function FolderPage() {
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await signOut(getAuth(app));
    await fetch("/api/logout");
    router.push("/login");
  }, [router]);
  return (
    <div>

      <h1 className="text-gray-400 text-center">Select a note to view.</h1>
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">log out</button>
    </div>
  );

}
