export interface Notifier {
    sendNotification(message: string): Promise<void>;
}
