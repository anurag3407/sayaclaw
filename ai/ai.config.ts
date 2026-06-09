import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getAgentModel() {
  if (process.env.GEMINI_API_KEY) {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    const modelId = process.env.GEMINI_DEFAULT_MODEL || "gemini-3.1-flash-lite";
    return google(modelId);
  }

  const provider = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const modelId = process.env.OPENROUTER_DEFAULT_MODEL || "anthropic/claude-3-haiku-20240307";
  return provider(modelId);
}