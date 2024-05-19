# Binance DCA Bot

A simple Dollar-Cost Averaging (DCA) bot for the Binance platform, developed using TypeScript. This bot automatically buys a specified cryptocurrency at regular intervals using the Binance API and deploys using Docker.

## Docker Hub

The Docker image for this project is available on Docker Hub: [binance-dca-bot](https://hub.docker.com/r/sudowanderer/binance-dca-bot)

## Features

- **Automatic DCA**: Automatically buys the specified cryptocurrency.
- **Configurable**: Easily configure target asset, order amount, and order currency through environment variables.
- Local Docker deployment

## Prerequisites

- Node.js (v20 LTS)
- Docker
- Docker Compose (optional)
- Git

## Setup

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
4. Build and run locally。
   ```shell
   npm start
   ```

## Local Docker Deployment
### Build Docker image

To build the Docker image locally:

```bash
docker build -t binance-dca-bot .
```
### Run Docker container
To run the Docker container:
```shell
docker run -d --name binance-dca-bot --env-file .env binance-dca-bot
```

### Docker Compose (optional)
If you prefer using Docker Compose, create a docker-compose.yml file:

```yaml
version: '3.8'

services:
  binance-dca-bot:
    build: .
    env_file:
      - .env
    restart: always
```
Run the container using Docker Compose:
```shell
docker-compose up -d
```