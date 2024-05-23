import axios from 'axios';
import {TelegramNotifier} from "../../src/notifiers/telegramNotifier";

describe('TelegramNotifier Integration Test', () => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    const chatId = process.env.TELEGRAM_CHAT_ID || '';
    let notifier: TelegramNotifier;

    beforeEach(() => {
        notifier = new TelegramNotifier(botToken, chatId);
        spyOn(axios, 'post').and.returnValue(Promise.resolve({ data: { ok: true } }));
    });

    it('should send a notification successfully', async () => {
        const message = 'Test notification message';
        await notifier.sendNotification(message);

        expect(axios.get).toHaveBeenCalledWith(
            `https://api.telegram.org/bot${botToken}/sendMessage`,{
                params : {
                    chat_id: chatId,
                    text: message,
                }
            }
        );
    });
});
