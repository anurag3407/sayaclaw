import chalk from "chalk";

import { select , isCancel }  from "@clack/prompts";


export async function runCliMode(){

    while(true){
        const mode = await select({
            message: "Choose cli sub mode",
            options: [
              { value : "agent", label : "Agent Mode" },
              {value : "plan" , label : "Plan Mode" },
              {value : "ask" , label : "Ask Mode" },
              {value : "back" , label : "<- Back to main menu" }
            ]
        });

        if(isCancel(mode) || mode === "back"){
            console.log(chalk.yellow("Going back to main menu..."));
            return;
        }
        if(mode === "agent"){
            await runAgentMode();
        }
        if(mode === "plan"){}
        if(mode === "ask"){}

        if (mode != "agent" && mode != "plan" && mode != "ask"){
            console.log(chalk.red("Invalid mode selected."));
        }
    }

}