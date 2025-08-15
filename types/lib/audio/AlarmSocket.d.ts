export default class AlarmSocket {
    private url;
    private webSocket;
    private isRetry;
    private retryCount;
    private timerId;
    private onOpenCb;
    private onCloseCb;
    private onMessageCb;
    /**
     * @param url - WebSocket 连接地址
     * @param options - 可选参数
     * @param options.isRetry - 是否开启重试机制，默认为 true
     * @param options.onClose - 连接关闭时的回调函数
     * @param options.onOpen - 连接打开时的回调函数
     * @param options.onMessage - 接收到消息时的回调函数
     */
    constructor(url: string, { isRetry, onClose: onCloseCb, onOpen: onOpenCb, onMessage: onMessageCb, }: {
        isRetry?: boolean | undefined;
        onClose?: (() => void) | undefined;
        onOpen?: (() => void) | undefined;
        onMessage?: ((data: any) => void) | undefined;
    });
    private reconnect;
    private onOpen;
    private onError;
    private notifyOpen;
    private notifyClose;
    private onClose;
    private onMessage;
    connect(): void;
    send(data: string): void;
    isOpen(): boolean | null;
    closeSocket(): void;
}
