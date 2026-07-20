import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({
        result: "Please enter an idea first.",
      });
    }

    const prompt = `
You are One Idea AI Creator Mode.

The user will describe an idea.

Return your answer using EXACTLY this format.

# 🎯 Opportunity Score
Give a score out of 10.

# 💡 Summary
Explain the opportunity in 2-3 paragraphs.

# 👥 Target Audience
List the ideal audience.

# 💰 Monetization
List at least 5 monetization ideas.

# 🎬 Content Ideas
Generate 10 content ideas.

# 📝 Sample Script
Write a short 20-30 second script.

# 🖼 Thumbnail Prompt
Generate a thumbnail prompt.

# 🎥 AI Video Prompt
Generate a cinematic AI video prompt.

# 📄 Caption
Write a social media caption.

# 🏷 Hashtags
Generate 15 hashtags.

# 📅 Smart Schedule
Suggest the best posting schedule.

# 🚀 First 5 Actions
Give five actionable next steps.

User Idea:

${idea}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.8,
      messages: [
        {
          role: "system",
          content:
            "You are an expert startup advisor, content strategist, business consultant, novel planner, and AI creator coach.",
        },
        {
          role: "user",
          content: prompt,
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
        "❌ Something went wrong. Please check your API key or try again.",
    });
  }
}