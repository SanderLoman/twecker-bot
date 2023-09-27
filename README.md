# Ethereum Token Tracking Telegram Bot

## Description

This Telegram bot is designed to track newly deployed tokens on the Ethereum network. Users can interact with the bot to filter tokens by name, enabling them to keep an eye on specific tokens as they are deployed. The bot provides real-time updates on new token deployments, including essential details like the token name, contract address, block number, and transaction hash.

## Features

- Real-time tracking of newly deployed Ethereum tokens
- Ability to filter tokens by name
- Telegram notifications with essential token details
- Commands for listing, tracking, and untracking tokens

## Prerequisites

- Node.js
- npm
- Web3.js
- Telegram Bot API

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/SanderLoman/twecker-bot.git
    ```

2. Navigate to the project directory:

    ```bash
    cd twecker-bot
    ```

3. Install the required packages:

    ```bash
    yarn add
    ```
    or
    ```bash
    npm i
    ```
5. Add your Telegram bot token and Ethereum Websocket Provider URL to the code:

   Replace these on line `5` and `10`: `YOUR_WEB3_RPC_URL_HERE` and `YOUR_TELEGRAM_BOT_TOKEN_HERE`

## Usage

1. Start the bot:

    ```bash
    cd twecker
    ```

    ```bash
    node main.js
    ```

2. Open Telegram and start a chat with your bot.

3. Use the following commands to interact with the bot:

    - `/track <tokenname>` or `/t <tokenname>`: Track tokens with a specific name.
    - `/untrack <tokenname>` or `/ut <tokenname>`: Stop tracking tokens with a specific name.
    - `/all` or `/a`: Log all token deployments.
    - `/none` or `/n`: Stop logging all token deployments.
    - `/list` or `/l`: List all tracked words.
    - `/clear` or `/c`: Clear all tracked words.
    - `/help` or `/h`: Show the list of commands.
