import { createOpenRouter} from "@openrouter/ai-sdk-provider"

export function getAgentModel(){

const provider = createOpenRouter({apiKey:process.env.OPENROUTER_API_KEY})

const modelId = process.env.OPENROUTER_DEFAULT_MODEL || "anthropic/claude-3-haiku-20240307";

return provider(modelId);



}