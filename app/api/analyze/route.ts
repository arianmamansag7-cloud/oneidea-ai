import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are One Idea AI, an expert startup and business opportunity advisor. Return your response in clean markdown.",
        },
        {
          role: "user",
          content: `
Analyze this idea:

${idea}

Return:

# 💡 Concept

# 🎯 Target Users

# 🚀 Opportunity

# 💰 Revenue Model

# 📈 Growth Strategy

# ⚠️ Risks

# ⭐ AI Score (1-10)

# ✅ Next Action
`,
        },
      ],
    });

    return Response.json({
      success: true,
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Failed to analyze idea.",
      },
      { status: 500 }
    );
  }
}
