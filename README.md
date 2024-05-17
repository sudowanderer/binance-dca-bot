# Binance DCA Bot

A simple Dollar-Cost Averaging (DCA) bot for the Binance platform, developed using TypeScript. This bot automatically buys a specified cryptocurrency at regular intervals using the Binance API and deploys using AWS Lambda to take advantage of the free tier.

## Features

- **Automatic DCA**: Automatically buys the specified cryptocurrency at regular intervals.
- **Configurable**: Easily configure target asset, order amount, and order currency through environment variables.
- **AWS Lambda Deployment**: Leverages AWS Lambda for serverless deployment, reducing costs and simplifying infrastructure management.

## Prerequisites

- Node.js and npm installed
- Binance API Key and Secret
- AWS account (for Lambda deployment)
- TypeScript

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/binance-dca-bot.git
    cd binance-dca-bot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the project root and configure the following environment variables:

    ```env
    BINANCE_API_KEY=your_binance_api_key
    BINANCE_API_SECRET=your_binance_api_secret
    TARGET_ASSET=BTC
    AMOUNT=100
    ORDER_CURRENCY=USDC
    ```

## Usage

To run the bot locally:

```bash
npm start