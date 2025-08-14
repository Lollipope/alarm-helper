// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
// import AlarmSocket from '../../lib/audio/AlarmSocket'

// class MockWebSocket {
//   static instances: MockWebSocket[] = []
//   public readyState = 0
//   public onopen: Function = () => {}
//   public onclose: Function = () => {}
//   public onerror: Function = () => {}
//   public onmessage: Function = () => {}
//   public sentData: any[] = []
//   constructor(public url: string) {
//     MockWebSocket.instances.push(this)
//   }
//   send(data: string) {
//     this.sentData.push(data)
//   }
//   close() {
//     this.readyState = 3
//     this.onclose()
//   }
//   triggerOpen() {
//     this.readyState = 1
//     this.onopen()
//   }
//   triggerMessage(data: any) {
//     this.onmessage({ data })
//   }
//   triggerError() {
//     this.onerror()
//   }
//   triggerClose() {
//     this.readyState = 3
//     this.onclose()
//   }
// }

// describe('AlarmSocket', () => {
//   let wsSpy: any

//   beforeEach(() => {
//     MockWebSocket.instances = []
//     wsSpy = vi
//       .spyOn(globalThis, 'WebSocket')
//       .mockImplementation((url: string) => new MockWebSocket(url) as any)
//     vi.useFakeTimers()
//   })

//   afterEach(() => {
//     wsSpy.mockRestore()
//     vi.useRealTimers()
//   })

//   it('should connect and trigger onOpen callback', () => {
//     const onOpen = vi.fn()
//     const socket = new AlarmSocket('ws://test', { onOpen })
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     expect(onOpen).toHaveBeenCalled()
//     expect(socket.isOpen()).toBe(true)
//   })

//   it('should trigger onMessage callback', () => {
//     const onMessage = vi.fn()
//     const socket = new AlarmSocket('ws://test', { onMessage })
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     ws.triggerMessage('hello')
//     expect(onMessage).toHaveBeenCalledWith('hello')
//   })

//   it('should trigger onClose callback and retry if isRetry is true', () => {
//     const onClose = vi.fn()
//     const socket = new AlarmSocket('ws://test', { onClose, isRetry: true })
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     ws.triggerClose()
//     expect(onClose).toHaveBeenCalled()
//     vi.advanceTimersByTime(3000)
//     expect(MockWebSocket.instances.length).toBe(2) // 重连
//   })

//   it('should not retry if isRetry is false', () => {
//     const onClose = vi.fn()
//     const socket = new AlarmSocket('ws://test', { onClose, isRetry: false })
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     ws.triggerClose()
//     expect(onClose).toHaveBeenCalled()
//     vi.advanceTimersByTime(3000)
//     expect(MockWebSocket.instances.length).toBe(1)
//   })

//   it('should send data when socket is open', () => {
//     const socket = new AlarmSocket('ws://test', {})
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     socket.send('msg')
//     expect(ws.sentData).toContain('msg')
//   })

//   it('should not send data when socket is not open and should retry if isRetry', () => {
//     const socket = new AlarmSocket('ws://test', { isRetry: true })
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     socket.send('msg')
//     expect(ws.sentData).not.toContain('msg')
//     vi.advanceTimersByTime(3000)
//     expect(MockWebSocket.instances.length).toBe(2)
//   })

//   it('should close socket and set isRetry to false', () => {
//     const socket = new AlarmSocket('ws://test', {})
//     socket.connect()
//     const ws = MockWebSocket.instances[0]
//     ws.triggerOpen()
//     socket.closeSocket()
//     expect(socket['isRetry']).toBe(false)
//     expect(ws.readyState).toBe(3)
//   })
// })

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
// import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AlarmSocket from '../../lib/audio/AlarmSocket'

describe('AlarmSocket', () => {
  let socket: AlarmSocket
  const url = 'ws://localhost:8080'
  const mockOnOpen = vi.fn()
  const mockOnClose = vi.fn()
  const mockOnMessage = vi.fn()

  beforeEach(() => {
    // 模拟 WebSocket 类
    global.WebSocket = vi.fn().mockImplementation(() => ({
      onopen: vi.fn(),
      onerror: vi.fn(),
      onclose: vi.fn(),
      onmessage: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
    }))
    socket = new AlarmSocket(url, {
      onOpen: mockOnOpen,
      onClose: mockOnClose,
      onMessage: mockOnMessage,
    })
    vi.useFakeTimers()
  })
  afterEach(() => {
    // 每次测试运行后恢复日期
    vi.useRealTimers()
  })

  it('should initialize with the correct values', () => {
    expect(socket).toHaveProperty('url', url)
    expect(socket).toHaveProperty('isRetry', true)
    expect(socket).toHaveProperty('retryCount', 0)
    expect(socket).toHaveProperty('webSocket', null)
    expect(socket).toHaveProperty('onOpenCb', mockOnOpen)
    expect(socket).toHaveProperty('onCloseCb', mockOnClose)
    expect(socket).toHaveProperty('onMessageCb', mockOnMessage)
  })

  it('should attempt to connect when connect() is called', () => {
    socket.connect()
    expect(WebSocket).toHaveBeenCalledWith(url)
  })

  it('should handle onOpen event', () => {
    socket.connect()
    // https://cn.vitest.dev/api/mock.html#mock-instances
    const onOpenCallback = WebSocket.mock.results[0].value.onopen
    onOpenCallback() // 调用 onOpen 回调
    expect(mockOnOpen).toHaveBeenCalled()
  })

  it('should handle onClose event and retry if isRetry is true', () => {
    socket.connect()
    const onCloseCallback = WebSocket.mock.results[0].value.onclose
    onCloseCallback() // 调用 onClose 回调
    expect(mockOnClose).toHaveBeenCalled()
    expect(socket['retryCount']).toBe(1) // 重试次数增加
  })

  it('should not retry if isRetry is false', () => {
    const socketNoRetry = new AlarmSocket(url, {
      isRetry: false,
      onOpen: mockOnOpen,
      onClose: mockOnClose,
      onMessage: mockOnMessage,
    })
    socketNoRetry.connect()
    const onCloseCallback = WebSocket.mock.results[0].value.onclose
    onCloseCallback() // 调用 onClose 回调
    expect(socketNoRetry['retryCount']).toBe(1) // 不会继续重试
  })

  it('should send data if the socket is open', () => {
    socket.connect()
    const sendData = 'Hello World'
    const isOpenSpy = vi.spyOn(socket, 'isOpen').mockReturnValue(true)
    socket.send(sendData)
    expect(isOpenSpy).toHaveBeenCalled()
    expect(WebSocket.mock.results[0].value.send).toHaveBeenCalledWith(sendData)
  })

  it('should not send data if the socket is not open and isRetry is true', () => {
    socket.connect()
    const sendData = 'Hello World'
    const isOpenSpy = vi.spyOn(socket, 'isOpen').mockReturnValue(false)
    socket.send(sendData)
    expect(WebSocket.mock.results[0].value.send).not.toHaveBeenCalled()
    // 确保重试机制被触发
    expect(socket['retryCount']).toBe(0)
    vi.advanceTimersToNextTimer()
    expect(WebSocket.mock.results.length).toBe(2)
  })

  it('should close the socket connection', () => {
    socket.connect()
    socket.closeSocket()
    expect(socket['isRetry']).toBe(false)
    expect(WebSocket.mock.results[0].value.close).toHaveBeenCalled()
  })
})
