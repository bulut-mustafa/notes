import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { question, context, notes } = body;

  if (!question || !context) {
    return NextResponse.json(
      { error: "Missing question or context" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
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
              content: `
You are an intelligent, context-aware assistant. You can answer questions based on the user's notes, but you're also capable of responding to general questions that are not related to notes.

Use the provided note context *only* if it’s relevant to the user's question. Otherwise, rely on your general knowledge.

- If the question involves comparing or analyzing notes, use the note context provided.
- If the question is unrelated (e.g., travel, programming, advice), treat it like a normal chatbot query.
- Format all answers using HTML for clarity, including <p>, <ul>, <li>, <b>, <h2>, etc.
- Keep responses helpful, clean, and easy to read.
            `.trim(),
            },
            {
              role: "user",
              content: `
Current note content:
"""
${context}
"""
            `.trim(),
            },
            {
              role: "user",
              content: `
All other notes:
"""
${notes}
"""
            `.trim(),
            },
            {
              role: "user",
              content: `
My question:
"${question}"
            `.trim(),
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
