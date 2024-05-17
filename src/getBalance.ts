import * as dotenv from 'dotenv';
import { Spot } from '@binance/connector-typescript';

dotenv.config();

// 从环境变量中读取 API 密钥和秘密
const apiKey = process.env.BINANCE_API_KEY || '';
const apiSecret = process.env.BINANCE_API_SECRET || '';

// 创建 Binance 客户端
const client = new Spot(apiKey, apiSecret);

/**
 * 查询指定资产的余额
 * @param {string} asset 资产符号，例如 'USDC' 或 'USDT'
 * @returns {Promise<string>} 返回当前资产的余额
 */
export const getBalance = async (asset: string): Promise<string> => {
    try {
        const accountInfo = await client.accountInformation();
        const balance = accountInfo.balances.find(b => b.asset === asset);
        return balance ? balance.free : '0';
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw new Error(`Failed to fetch balance: ${error}`);
    }
};