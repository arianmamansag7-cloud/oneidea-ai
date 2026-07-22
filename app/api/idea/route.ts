import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function selectBrain(idea: string) {
  const text = idea.toLowerCase();

  if (
    text.includes("novel") ||
    text.includes("story") ||
    text.includes("book") ||
    text.includes("character")
  ) {
    return {
      name: "Story Forge Brain",
      prompt:
        "You are Story Forge Brain. Create powerful stories with characters, world building, conflicts, emotional hooks, and chapter directions.",
    };
  }

  if (
    text.includes("youtube") ||
    text.includes("video") ||
    text.includes("content") ||
    text.includes("creator")
  ) {
    return {
      name: "Creator Forge Brain",
      prompt:
        "You are Creator Forge Brain. Build a content strategy including audience, growth plan, content ideas, and monetization methods.",
    };
  }

  if (
    text.includes("app") ||
    text.includes("software") ||
    text.includes("ai") ||
    text.includes("platform")
  ) {
    return {
      name: "Tech Forge Brain",
      prompt:
        "You are Tech Forge Brain. Design the product idea including features, users, technology, MVP roadmap, and scaling strategy.",
    };
  }

  return {
    name: "Startup Forge Brain",
    prompt:
      "You are Startup Forge Brain. Transform ideas into business opportunities with market analysis, monetization, action plans, and growth strategies.",
  };
}

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    const brain = selectBrain(idea);

    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are One Idea AI.

Active Brain:
${brain.name}

${brain.prompt}

Always create a detailed but practical blueprint.
`,
        },
        {
          role: "user",
          content: idea,
        },
      ],
    });

    return NextResponse.json({
      brain: brain.name,
      result: chat.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "AI connection failed" },
      { status: 500 }
    );
  }
}
