import * as dotenv from 'dotenv';
import { buyWithQuoteAsset, OrderResponse } from './buyWithQuoteAsset';
import {getBalance} from "./getBalance";

dotenv.config();

// 检查环境变量是否设置
const symbol = process.env.SYMBOL;
const amountStr = process.env.AMOUNT;
const orderCurrency = process.env.ORDER_CURRENCY;

if (!symbol || !amountStr || !orderCurrency) {
    throw new Error('Environment variables SYMBOL, AMOUNT, and ORDER_CURRENCY must be set');
}

// 转换数值类型
const amount = parseFloat(amountStr);

if (isNaN(amount)) {
    throw new Error('AMOUNT environment variable must be a valid number');
}

const executeDCA = async () => {
    try {
        // 执行定投操作
        const response = await buyWithQuoteAsset(symbol, amount);
        // 使用类型断言将 orderResponse 转换为 OrderResponse 类型
        const orderResponse = response as OrderResponse;
        // 检查订单响应中的一些关键字段
        console.log(`Order placed successfully for ${symbol}:`);
        console.log(`Order ID: ${orderResponse.orderId}`);
        console.log(`Status: ${orderResponse.status}`);
        console.log(`Executed Quantity: ${orderResponse.executedQty}`);

        // 验证买单之后的报价资产余额
        const balance = await getBalance(orderCurrency);
        console.log(`Remaining ${orderCurrency} Balance: ${balance} ${orderCurrency}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error during DCA process:', error.message);
        } else {
            console.error('Unexpected error type:', error);
        }
    }
};

executeDCA();