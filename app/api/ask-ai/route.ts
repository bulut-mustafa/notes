import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { question, allNotes, context, notes } = body;

  if (!question || !context) {
    return NextResponse.json(
      { error: "Missing question or context" },
      { status: 400 }
    );
  }

  try {
    const messages = [
      {
        role: "system",
        content: `
You are a helpful, intelligent assistant.

You must format all of your responses using **only HTML**, not Markdown or plain text. Do not escape characters. Use HTML elements such as:

- <p> for paragraphs
- <ul>, <li> for bullet points
- <h2>, <h3> for headings
- <b> or <strong> for emphasis
- <code> or <pre> for code

Example output:
<h2>Key Points</h2>
<ul>
  <li><b>Topic:</b> Explanation of the main idea.</li>
  <li><b>Tip:</b> Use structured formatting for clarity.</li>
</ul>
<p>This is a simple paragraph of text.</p>

----

When answering:
${allNotes
  ? "- Use all notes as your main reference context if relevant."
  : "- Use only the current note as reference. Ignore other notes."}

If the question is general and not related to the note context (e.g. travel, tech, advice), answer based on your knowledge.

Respond in a way that is:
- Easy to read and well-structured
- Fully formatted using HTML
- Professional, clean, and helpful
        `.trim(),
      },
      {
        role: "user",
        content: `Current Note:\n"""\n${context}\n"""`,
      },
      ...(allNotes
        ? [
            {
              role: "user",
              content: `All Notes:\n"""\n${notes}\n"""`,
            },
          ]
        : []),
      {
        role: "user",
        content: `Question:\n"${question}"`,
      },
    ];

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
          messages,
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
