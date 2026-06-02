import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE = chalk.hex('#9a7bff').bold;

function printBannerWithShadow(ascii: string) {
    const bannerLines = ascii.split('\n');
    const maxLength = Math.max(...bannerLines.map(line => line.length));
    const rowWidth = maxLength + 2;

    for (const line of bannerLines) {
        console.log(FACE('  ' + line).padEnd(rowWidth));
    }
    console.log();
}

export async function runWakeup() {
    let ascii: string;
    try {
        ascii = figlet.textSync("Sayaclaw", { font: BANNER_FONT });
    } catch (error) {
        ascii = figlet.textSync("Sayaclaw", { font: 'Standard' });
    }

    printBannerWithShadow(ascii);
}