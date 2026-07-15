
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { idea, mode } = await req.json();

    let instruction = "";

    if (mode === "business") {
      instruction = `
Find a business opportunity from this idea.
Focus on customers, problem, solution, money, and first steps.
`;
    }

    if (mode === "app") {
      instruction = `
Transform this idea into an app opportunity.
Suggest features, users, and MVP plan.
`;
    }

    if (mode === "novel") {
      instruction = `
Transform this idea into a story concept.
Create title, genre, characters, and story hook.
`;
    }

    if (mode === "money") {
      instruction = `
Find realistic ways this idea can generate income.
Focus on beginner-friendly steps.
`;
    }

    if (mode === "problem") {
      instruction = `
Analyze what problem this idea solves and how to improve it.
`;
    }

    const prompt = `
You are One Idea AI, an encouraging AI mentor.

User idea:
"${idea}"

Mode:
${mode}

${instruction}

Never say an idea is useless.
Find potential and suggest improvements.

End with:
🚀 Next Action:
(the first small step the user can do)
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate." },
      { status: 500 }
    );
  }
}

