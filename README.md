# Sayaclaw AI Orchestrator

Sayaclaw is a powerful AI-driven orchestrator designed to streamline various tasks through an intelligent agent. It supports multiple operational modes, including a command-line interface, a Telegram bot, and an autonomous agent for planning and execution.

## Features

*   **Multi-mode Operation:** Seamlessly switch between Agent, Ask, Plan, and Telegram modes to suit your needs.
*   **AI-Powered Agent:** Utilizes advanced AI models for intelligent task planning, execution, and decision-making.
*   **Task Planning & Execution:** Generate and follow detailed plans to accomplish complex objectives, leveraging integrated tools.
*   **Question Answering:** Quickly get answers to your queries in "Ask" mode.
*   **Telegram Bot Integration:** Interact with the AI orchestrator through a user-friendly Telegram bot for on-the-go access.
*   **Command-Line Interface (CLI):** Full control and interaction via the terminal for developers and power users.
*   **Web Interaction:** Capability to interact with web content, enabling the agent to gather information and perform actions online using tools like Firecrawl.

## Installation

To set up Sayaclaw, you will need [Bun](https://bun.sh/) installed on your system.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/sayaclaw.git # Replace with actual repo URL
    cd sayaclaw
    ```
2.  **Install dependencies:**
    ```bash
    bun install
    ```

## Usage

Sayaclaw can be run in various modes depending on the task you want to perform.

### General Usage

```bash
bun run index.ts [mode] [arguments]
```

### Modes

*   **Agent Mode:** For autonomous task execution.
    ```bash
    bun run index.ts agent
    ```
*   **Ask Mode:** To ask a question and get a direct answer.
    ```bash
    bun run index.ts ask "What is the capital of France?"
    ```
*   **Plan Mode:** To define a task and have the AI generate a plan.
    ```bash
    bun run index.ts plan "Research the best AI models for code generation."
    ```
*   **Telegram Mode:** To start the Telegram bot.
    ```bash
    bun run index.ts telegram
    ```
    *(Note: Telegram mode requires proper configuration of bot tokens and other settings, likely in environment variables or `ai/ai.config.ts`.)*

## Configuration

AI model settings and other configurations may be managed within `ai/ai.config.ts` and through environment variables. Refer to the specific mode documentation or source code for detailed configuration options.
