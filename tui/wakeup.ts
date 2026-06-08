import { select, isCancel } from "@clack/prompts";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";
import { runTelegramMode } from "../modes/telegram";

const BANNER_FONT = 'ANSI Shadow';

function getBannerLines(): string[] {
  return figlet.textSync("Sayaclaw", { font: BANNER_FONT }).split('\n');
}

export async function runWakeup() {
  const bannerLines = getBannerLines();
  
  for (const line of bannerLines) {
    console.log('  ' + line);
  }
  
  const mode = await select({
    message: 'Pick a mode',
    options: [
      { value: 'cli', label: 'CLI Mode' },
      { value: 'telegram', label: 'Telegram Mode' }
    ]
  });
  
  if (isCancel(mode)) {
    console.log('Operation cancelled');
    process.exit(0);
  }
  
  if (mode === 'cli') {
    await runCliMode();
  } else if (mode === 'telegram') {
    await runTelegramMode();
  }
}