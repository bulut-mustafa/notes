// app/api/ask-ai/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { question, context, notes } = body;

  if (!question || !context) {
    return NextResponse.json({ error: "Missing question or context" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that answers questions about notes. Please use HTML formatting like <p>, <ul>, <li>, <b> etc. in your responses for readability.",
          },
          {
            role: "user",
            content: `Here is the content of the current note:\n\n"""${context}"""`,
          },
          {
            role: "user",
            content: `Here are the contents of my other notes:\n\n"""${notes}"""`,
          },
          {
            role: "user",
            content: `My question is: ${question}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 });
  }
}
