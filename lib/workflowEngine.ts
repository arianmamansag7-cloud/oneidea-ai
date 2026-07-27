import { detectIntent } from "./intentAnalyzer";
import { Brains } from "./brains";

export function buildWorkflow(idea: string) {
  const intent = detectIntent(idea);

  switch (intent) {
    case "creator":
      return {
        brain: "Creator Forge",
        prompt: Brains.creator,
        workflow: [
          "Audience Analysis",
          "Content Strategy",
          "Script",
          "Storyboard",
          "Thumbnail",
          "Caption",
          "Hashtags",
        ],
      };

    case "business":
      return {
        brain: "Business Forge",
        prompt: Brains.business,
        workflow: [
          "Market Research",
          "Business Model",
          "Monetization",
          "Growth Plan",
        ],
      };

    case "novel":
      return {
        brain: "Story Forge",
        prompt: Brains.novel,
        workflow: [
          "Characters",
          "World",
          "Plot",
          "Chapter",
          "Dialogue",
        ],
      };

    case "marketing":
      return {
        brain: "Marketing Forge",
        prompt: Brains.marketing,
        workflow: [
          "Brand",
          "Campaign",
          "Content",
          "Growth",
        ],
      };

    default:
      return {
        brain: "General Forge",
        prompt: Brains.general,
        workflow: [
          "Analysis",
          "Planning",
          "Execution",
        ],
      };
  }
}
