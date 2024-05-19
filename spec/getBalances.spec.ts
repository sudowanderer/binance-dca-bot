import * as dotenv from 'dotenv';
import {getBalance} from "../src/getBalance";

dotenv.config();

describe('Integration Test for getBalance', () => {
    it('should return the balance for the given asset', async () => { // 移除 done 回调
        const asset = 'USDC'; // 可以替换为你实际使用的资产符号
        try {
            const balance = await getBalance(asset);
            console.log(`Balance for ${asset}: ${balance}`);
            expect(parseFloat(balance)).toBeGreaterThanOrEqual(0);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching balance:', error);
                fail(`Failed to fetch balance: ${error.message}`);
            } else {
                console.error('Unexpected error type:', error);
                fail('Failed to fetch balance due to unexpected error type.');
            }
        }
    });
});