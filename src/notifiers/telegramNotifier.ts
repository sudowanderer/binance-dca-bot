import axios from 'axios';
import { Notifier } from './notifier';

export class TelegramNotifier implements Notifier {
    private readonly botToken: string;
    private readonly chatId: string;

    constructor(botToken: string, chatId: string) {
        this.botToken = botToken;
        this.chatId = chatId;
    }

    async sendNotification(message: string): Promise<void> {
        if (process.env.IS_TEST_ENV === 'true') {
            console.log('Test environment detected, skipping actual notification.');
            return;
        }

        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        const params = {
            chat_id: this.chatId,
            text: message,
        };

        try {
            await axios.get(url, { params });
        } catch (error) {
            console.error('Error sending Telegram notification:', error);
        }
    }
}
