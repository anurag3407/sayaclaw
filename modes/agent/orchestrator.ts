import { text, isCancel, spinner } from "@clack/prompts";
import chalk from "chalk";
import { renderTerminalMarkdown } from "../../tui/terminal-md";
import { getAgentModel } from "../../ai/index";
import { ToolLoopAgent, stepCountIs } from "ai";
import { ActionTracker } from "./action-tracker";
import { ToolExecutor } from "./tool-executor";
import { createAgentTools } from "./agent-tools";
import { runApprovalFlow } from "./approval";
import { defaultAgentConfig } from "./types";

export async function runAgentMode() {
    console.log(chalk.bold('\n Agent Mode\n'));

    const goal = await text({
        message: "What Would you like the agent to do ? ",
        placeholder: "Concrete task for this codebase..",
    });

    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig();

    const tracker = new ActionTracker();

    const executor = new ToolExecutor(tracker, config);

    const tools = createAgentTools(executor);

    const agent = new ToolLoopAgent({
        model: getAgentModel(),
        stopWhen: stepCountIs(40),
        instructions: [
            `Workspace root : ${config.codebasePath}`,
            'All mutations are staged until approval. ',
        ].join("\n"),
        tools,
    });

    const s = spinner();
    s.start(chalk.cyan("Agent is awakening..."));

    const result = await agent.generate({
        prompt: goal.trim(),
        onStepFinish: ({toolCalls}) => {
            for(const tc of toolCalls) {
                const preview = JSON.stringify(tc.input).slice(0,60);
                s.message(chalk.cyan(`Executing ${tc.toolName}... `) + chalk.dim(preview + (preview.length >= 60 ? "..." : "")));
            }
        }
    });
    
    s.stop(chalk.green("Agent finished its task."));

    if(result.text?.trim()) {
        console.log(renderTerminalMarkdown(result.text));
    }

    const ok = await runApprovalFlow(tracker);
    if(!ok) return executor.clearStaging();
    
    const {errors} = executor.applyApprovedFromTracker();
    if(errors.length > 0) {
        console.log(chalk.red("Error applying changes"));
        for(const err of errors) console.log(chalk.red(err));
    } else {
        console.log(chalk.green("Changes applied successfully"));
    }
}
