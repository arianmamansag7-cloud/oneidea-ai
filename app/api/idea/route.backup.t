import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are One Idea AI. Turn simple ideas into business opportunities, action plans, monetization ideas, and creative strategies.",
        },
        {
          role: "user",
          content: idea,
        },
      ],
    });

    return NextResponse.json({
      result: chat.choices[0].message.content,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "AI connection failed" },
      { status: 500 }
    );
  }
}
