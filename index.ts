#!/usr/bin/env bun 

import {Command} from "commander";
import {runWakeup} from "./tui/wakeup";


const program = new Command();

program
  .name("sayaclaw")
  .description("A simple CLI tool")
  .version("1.0.0");


program
  .command("wakeup")
  .description("Show the banner and pick cli or telegram mode")
  .action(async () => {
    await runWakeup();
  });


await program.parseAsync(process.argv);

