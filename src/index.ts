import {Context, APIGatewayProxyResult, APIGatewayEvent} from 'aws-lambda';
import * as dotenv from 'dotenv';
import {buyWithQuoteAsset, OrderResponse} from './buyWithQuoteAsset';
import {getBalance} from './getBalance';
import {TelegramNotifier} from './notifiers/telegramNotifier';
import {Notifier} from './notifiers/notifier';

dotenv.config();

const targetAsset = process.env.TARGET_ASSET;
const amountStr = process.env.AMOUNT;
const orderCurrency = process.env.ORDER_CURRENCY;
const balanceThresholdStr = process.env.BALANCE_THRESHOLD;
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.TELEGRAM_CHAT_ID;

// 验证环境变量
if (!targetAsset || !amountStr || !orderCurrency) {
    throw new Error('Environment variables TARGET_ASSET, AMOUNT, and ORDER_CURRENCY must be set');
}

const symbol = `${targetAsset}${orderCurrency}`;
const amount = parseFloat(amountStr);

if (isNaN(amount)) {
    throw new Error('AMOUNT environment variable must be a valid number');
}

const balanceThreshold = balanceThresholdStr ? parseFloat(balanceThresholdStr) : null;

let notifier: Notifier | null = null;
if (telegramBotToken && telegramChatId) {
    notifier = new TelegramNotifier(telegramBotToken, telegramChatId);
}

// Lambda handler
export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    try {
        // 执行定投操作
        const response = await buyWithQuoteAsset(symbol, amount);
        const orderResponse = response as OrderResponse;

        console.log(`Order placed successfully for ${symbol}:`);
        console.log(`Order ID: ${orderResponse.orderId}`);
        console.log(`Status: ${orderResponse.status}`);
        console.log(`Executed Quantity: ${orderResponse.executedQty}`);

        // 验证买单之后的报价资产余额
        const balance = await getBalance(orderCurrency);
        console.log(`Remaining ${orderCurrency} Balance: ${balance} ${orderCurrency}`);

        if (balanceThreshold !== null && parseFloat(balance) < balanceThreshold && notifier) {
            await notifier.sendNotification(
                `Warning: Your ${orderCurrency} balance is below the threshold of ${balanceThreshold}. Current balance: ${balance}`
            );
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'DCA process executed successfully',
                orderId: orderResponse.orderId,
                balance,
            }),
        };
    } catch (error) {
        console.error('Error during DCA process:', error);
        if (notifier)
            await notifier.sendNotification(`Error during DCA process: ${error}.q`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error during DCA process',
                error: error instanceof Error ? error.message : 'Unknown error',
            }),
        };
    }
};