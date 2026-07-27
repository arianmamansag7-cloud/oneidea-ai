import creatorBrain from "./creatorBrain";
import businessBrain from "./businessBrain";
import novelBrain from "./novelBrain";
import marketingBrain from "./marketingBrain";

export const Brains = {
  creator: creatorBrain,
  business: businessBrain,
  novel: novelBrain,
  marketing: marketingBrain,

  general: `
You are Forge General Brain.

Transform any idea into a complete execution blueprint.

Always provide:

🧠 Analysis

🎯 Best Strategy

🚀 Execution Plan

💰 Monetization

📈 Growth

⚠ Risks

✅ First Actions
`,
};
