import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea?.trim()) {
      return NextResponse.json({
        result: "❌ Please enter an idea first.",
      });
    }

    const systemPrompt = `
You are One Idea AI.

MISSION:
Transform one simple idea into a complete execution plan.

RULES:
- Never mention prompts.
- Never say "As an AI..."
- Keep everything mobile friendly.
- Avoid long paragraphs.
- Use emojis naturally.
- Use bullet points.
- Every section should be short and easy to copy.

Always reply using EXACTLY this format:

🎯 Opportunity Score
Score out of 10.

━━━━━━━━━━━━━━

💡 Summary
Maximum 3 bullet points.

━━━━━━━━━━━━━━

👥 Target Audience
5 bullet points.

━━━━━━━━━━━━━━

💰 Monetization
5 bullet points.

━━━━━━━━━━━━━━

📈 Market Potential
Short explanation.

━━━━━━━━━━━━━━

🎬 10 Content Ideas
One line each.

━━━━━━━━━━━━━━

📝 Sample Script

Hook

Body

CTA

Maximum 8 lines.

━━━━━━━━━━━━━━

🖼 Thumbnail Prompt

One paragraph.

━━━━━━━━━━━━━━

🎥 AI Video Prompt

Short cinematic prompt.

━━━━━━━━━━━━━━

📄 Caption

Maximum 3 short paragraphs.

━━━━━━━━━━━━━━

🏷 Hashtags

One line only.

Example:

#AI #Business #Startup

━━━━━━━━━━━━━━

📅 Smart Schedule

Recommend posting days and times.

━━━━━━━━━━━━━━

🚀 First 5 Actions

Checklist format.

IMPORTANT:

Everything must be easy to copy.

Never write huge paragraphs.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: idea,
        },
      ],
    });

    return NextResponse.json({
      result:
        completion.choices[0]?.message?.content ??
        "No response generated.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      result:
        "❌ Something went wrong. Please check your API key.",
    });
  }
}