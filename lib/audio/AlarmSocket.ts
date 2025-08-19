/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:22
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-05-26 09:12:24
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\tool\AlarmSocket.ts
 * @Description: 告警Socket类
 */
export const noop = () => {}
export default class AlarmSocket {
  private url: string
  private webSocket: WebSocket | null
  private isRetry: boolean
  private retryCount: number
  private timerId: number
  private onOpenCb: typeof noop
  private onCloseCb: typeof noop
  private onMessageCb: (data: string) => void
  /**
   * @param url - WebSocket 连接地址
   * @param options - 可选参数
   * @param options.isRetry - 是否开启重试机制，默认为 true
   * @param options.onClose - 连接关闭时的回调函数
   * @param options.onOpen - 连接打开时的回调函数
   * @param options.onMessage - 接收到消息时的回调函数
   */
  constructor(
    url: string,
    {
      isRetry = true,
      onClose: onCloseCb = noop,
      onOpen: onOpenCb = noop,
      onMessage: onMessageCb = (data: string) => console.log(data),
    },
  ) {
    this.url = url
    this.isRetry = isRetry
    // 重试次数
    this.retryCount = 0
    this.timerId = -1
    this.webSocket = null
    this.onOpenCb = onOpenCb
    this.onCloseCb = onCloseCb
    this.onMessageCb = onMessageCb
    // 绑定this
    this.reconnect = this.reconnect.bind(this)
    this.connect = this.connect.bind(this)
    this.onOpen = this.onOpen.bind(this)
    // this.onError = this.onError.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.send = this.send.bind(this)
  }
  // 以下为私有方法
  // 重连
  private reconnect() {
    this.timerId && clearTimeout(this.timerId)
    this.timerId = setTimeout(this.connect, 3000) as unknown as number
  }

  // 通道连接成功
  private onOpen() {
    this.retryCount = 0
    // 通知连接成功
    this.notifyOpen()
  }
  // 通道异常
  // private onError() {}
  // 通知连接成功
  private notifyOpen() {
    this.onOpenCb()
  }
  // 通知关闭
  private notifyClose() {
    this.onCloseCb()
  }
  // 通道关闭
  private onClose() {
    this.notifyClose()
    this.retryCount++
    this.isRetry && this.reconnect()
  }
  // 接收消息
  private onMessage({ data }: MessageEvent) {
    console.log(`respone::receive raw data:`, data)
    this.onMessageCb(data)
  }
  // 以下为公共方法
  // 建立socket 连接
  connect() {
    try {
      if (typeof WebSocket !== 'undefined' && this.url) {
        this.webSocket = new WebSocket(this.url) as WebSocket
        // 监听socket连接
        this.webSocket.onopen = this.onOpen
        // 监听socket错误信息
        // this.webSocket.onerror = this.onError
        // 监听socket关闭
        this.webSocket.onclose = this.onClose
        // 监听socket消息
        this.webSocket.onmessage = this.onMessage
      }
    } catch (error) {
      this.reconnect()
    }
  }
  // 发送消息
  send(data: string) {
    if (this.isOpen()) {
      console.log(`send:: socket send:`, data)
      this.webSocket?.send(data)
    } else {
      console.warn(`send:: socket send:通道未建立,不发送数据:`, data)
      this.isRetry && this.reconnect()
    }
  }
  // 当前websocket通道状态
  isOpen() {
    return this.webSocket && this.webSocket.readyState === 1
  }
  // 关闭socket连接
  closeSocket() {
    this.isRetry = false
    this.webSocket && this.webSocket.close()
  }
}
