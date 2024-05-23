import * as dotenv from 'dotenv';
import {buyWithQuoteAsset, OrderResponse} from '../src/buyWithQuoteAsset';
import {getBalance} from "../src/getBalance";

dotenv.config();

describe('Integration Test for buyWithQuoteAsset', () => {
    it('should successfully place an order and return the order response', async () => {
        const symbol = 'BTCUSDC';
        const amount = 1; // 使用一个较小的金额进行测试，避免大量资金消耗

        try {
            const orderResponse = await buyWithQuoteAsset(symbol, amount);
            // 使用类型断言将 orderResponse 转换为 OrderResponse 类型
            const response = orderResponse as OrderResponse;

            // 检查订单响应中的一些关键字段
            expect(response.symbol).toBe(symbol);
            expect(response.orderId).not.toBeUndefined();
            expect(response.status).not.toBeUndefined();
            expect(response.executedQty).not.toBeUndefined();

            // 验证返回的某些字段是否存在且类型正确
            expect(typeof response.orderId).toBe('number');
            expect(typeof response.status).toBe('string');
            expect(parseFloat(response.executedQty)).toBeGreaterThan(0);

            // 验证买单之后的报价资产余额
            const quoteAsset = symbol.slice(-4); // 获取报价资产
            const balance = await getBalance(quoteAsset);
            console.log(`Remaining ${quoteAsset} Balance: ${balance} ${quoteAsset}`);
            expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error placing order:', error);
                fail(`Failed to place order: ${error.message}`);
            } else {
                console.error('Unexpected error type:', error);
                fail('Failed to place order due to unexpected error type.');
            }
        }
    });
});