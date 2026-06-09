import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";
import { runTelegramMode } from "../modes/telegram";

const BANNER_FONT = 'ANSI Shadow';
const SAYA_RED = chalk.hex('#dc2323');
const SPIRIT_PURPLE = chalk.hex('#4B0082');

function getBannerLines(): string[] {
  return figlet.textSync("Sayaclaw", { font: BANNER_FONT }).split('\n');
}

export async function runWakeup() {
  const bannerLines = getBannerLines();
  
  for (const line of bannerLines) {
    console.log('  ' + SAYA_RED.bold(line));
  }
  
  console.log(SPIRIT_PURPLE.italic('\n  "The dark spirits awaken..."\n'));
  
  const mode = await select({
    message: SAYA_RED('Choose your path'),
    options: [
      { value: 'cli', label: 'CLI Mode (Terminal)' },
      { value: 'telegram', label: 'Telegram Mode (Bot)' }
    ]
  });
  
  if (isCancel(mode)) {
    console.log(SPIRIT_PURPLE('The spirits return to slumber.'));
    process.exit(0);
  }
  
  if (mode === 'cli') {
    await runCliMode();
  } else if (mode === 'telegram') {
    await runTelegramMode();
  }
}