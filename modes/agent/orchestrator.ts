import { text } from "@clack/prompts";
import chalk from "chalk";
import { renderTerminalMarkdown } from "../../tui/terminal-md";


export async funciton runAgentMode () {
    console.timeLog(chalk.bold('\n Agent Mode\n'));



    const goal = await text ({
        message : "What Would you like the agent to do ? ",
        placeholder : "Concrete task for this codebase..",
    });

    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig()

    const tracker = new ActionTracker();

    const executor = new ToolExecutor(config, tracker);

    const tools = createAgentTools(executor);


    const agent = nre ToolLoopAgent({
        model:getAgentModel(),
        stopwhen:stepcountIs(40),
        instructions : [
            'Workspace root : ${config.codebasePath}',
            'All mutations are staged until approval. ',
        ].join("\n"),
        tools,
    });

    const result = await agent.generate({
        prompt:goal.trim(),
        onStepFinish:({toolCalls})=>{
            for(const tc of toolCalls) {
                const preview = json.stringify(tc.input).slice(0,160);
                console.log(
                    chalk.green('>> ') 
                    chalk.bold(string(tc.toolName   )),
                    chalk.dim(preview + (preview.length >= 160 ? "...") )
                )
    });

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
    }}

    
}

