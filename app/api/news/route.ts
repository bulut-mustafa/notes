// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = process.env.MEDIASTACK_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "Missing Mediastack access key" }, { status: 500 });
  }

  const apiUrl = `http://api.mediastack.com/v1/news?access_key=${accessKey}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
