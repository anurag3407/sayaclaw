import chalk from "chalk";

import { select , isCancel }  from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator";
import { runAskMode } from "./ask/orchestrator";
import { runPlanMode } from "./plan/orchestrator";

export async function runCliMode(){

    while(true){
        const mode = await select({
            message: chalk.hex('#d147479d')("Choose your spirit mode"),
            options: [
              { value : "agent", label : "Agent Mode (Summon)" },
              {value : "plan" , label : "Plan Mode (Strategize)" },
              {value : "ask" , label : "Ask Mode (Consult)" },
              {value : "back" , label : "<- Retreat to shadows" }
            ]
        });

        if(isCancel(mode) || mode === "back"){
            console.log(chalk.hex('#4B0082')("Returning to the void..."));
            return;
        }
        if(mode === "agent"){
            await runAgentMode();
        }
        if(mode === "plan"){
            await runPlanMode();
        }
        if(mode === "ask"){
            await runAskMode();
        }

        if (mode != "agent" && mode != "plan" && mode != "ask"){
            console.log(chalk.red("Invalid mode selected."));
        }
    }

}