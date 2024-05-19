import * as dotenv from 'dotenv';
import {Spot, Side, OrderType} from '@binance/connector-typescript';


dotenv.config();

// 从环境变量中读取 API 密钥和秘密
const apiKey = process.env.BINANCE_API_KEY || '';
const apiSecret = process.env.BINANCE_API_SECRET || '';

// 创建 Binance 客户端
const client = new Spot(apiKey, apiSecret);

// 定义接口来描述 orderResponse 的结构
export interface OrderResponse {
    symbol: string;
    orderId: number;
    status: string;
    executedQty: string;
}

/**
 * 使用指定的金额购买指定交易对的币种
 * @param {string} symbol 交易对符号，例如 'BTCUSDC' 或 'BTCUSDT'
 * @param {number} amount 购买的金额
 * @returns {Promise<object>} 返回订单响应数据
 */
export const buyWithQuoteAsset = async (symbol: string, amount: number): Promise<object> => {
    try {
        // 下市价单
        const orderResponse = await client.newOrder(symbol, Side.BUY, OrderType.MARKET, {
            quoteOrderQty: amount, // 使用报价资产金额
        });
        console.log('Order placed:', orderResponse.orderId);
        return orderResponse;
    } catch (error) {
        console.error('Error executing investment:', error);
        throw new Error(`Investment failed: ${error}`);
    }
};

