export type BrainType =
  | "creator"
  | "business"
  | "novel"
  | "marketing"
  | "general";

export function detectIntent(input: string): BrainType {
  const text = input.toLowerCase();

  if (
    text.includes("youtube") ||
    text.includes("tiktok") ||
    text.includes("facebook") ||
    text.includes("video") ||
    text.includes("content") ||
    text.includes("shorts") ||
    text.includes("channel")
  ) {
    return "creator";
  }

  if (
    text.includes("business") ||
    text.includes("startup") ||
    text.includes("coffee") ||
    text.includes("shop") ||
    text.includes("money")
  ) {
    return "business";
  }

  if (
    text.includes("novel") ||
    text.includes("story") ||
    text.includes("chapter") ||
    text.includes("mafia")
  ) {
    return "novel";
  }

  if (
    text.includes("marketing") ||
    text.includes("branding")
  ) {
    return "marketing";
  }

  return "general";
}
