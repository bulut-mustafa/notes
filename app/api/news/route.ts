// app/api/news/route.ts
import { NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust the import path as necessary

export async function GET() {
  const accessKey = process.env.MEDIASTACK_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Missing Mediastack access key" }, { status: 500 });
  }

  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${accessKey}&languages=en`;

  try {
    // Fetch news from Mediastack API
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: res.status });
    }

    const data = await res.json();
    const articles = data.data || []; // Ensure that data contains articles

    // Store fetched news in Firestore with a timestamp
    const timestamp = new Date().toISOString();
    const docRef = doc(db, "cachedNews", timestamp); // Use timestamp as doc ID

    await setDoc(docRef, {
      createdAt: timestamp,
      articles: articles,
    });

    return NextResponse.json({ message: "News successfully saved to Firestore", articles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
