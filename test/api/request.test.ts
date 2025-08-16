import { describe, it, expect, vi, beforeEach } from 'vitest'
// import axios from 'axios'
import service, { getBaseUrl, getRealUrl } from '@ah/api/request'
import { emitter, EmitEventApi } from '@ah/utils/bus'
import { getTokenId } from '@ah/utils/tokenId'

// 模拟全局配置
vi.mock('window', {
  globalConfig: {
    AlarmRobotApiContext: '/api',
  },
})

// 模拟依赖项
vi.mock('@ah/api/auth', () => ({
  getToken: vi.fn().mockReturnValue('mock-token'),
}))
vi.mock('@ah/utils/tokenId', () => ({
  getTokenId: vi.fn().mockReturnValue('mock-token-id'),
}))
vi.mock('@ah/utils/bus', () => ({
  emitter: {
    emit: vi.fn(),
  },
  EmitEventApi: 'mock-event',
}))
// vi.mock('axios', () => ({
//   default: {
//     get: vi.fn().mockResolvedValue({ data: 'response' }),
//     post: vi.fn().mockResolvedValue({ data: 'response' }),
//     create: vi.fn().mockReturnValue({
//       interceptors: {
//         request: {
//           use: () => {},
//         },
//         response: {
//           use: () => {},
//         },
//       },
//     }),
//   },
// }))
describe('Axios Service', () => {
  // // 测试请求拦截器
  // describe('Request Interceptor', () => {
  //   it('should add headers when token exists', async () => {
  //     const config = {
  //       url: '/test',
  //       method: 'get',
  //     } as any

  //     const result = await service(config)

  //     expect(result.headers).toHaveProperty('Accept-Sign-Ignore', 'BIGBIGGIRL')
  //     expect(result.headers).toHaveProperty('cdp-token', 'mock-token-id')
  //   })
  // })

  // // 测试响应拦截器
  // describe('Response Interceptor', () => {
  //   it('should emit error event on failed response', async () => {
  //     const errorResponse = {
  //       response: {
  //         status: 401,
  //         data: { error: 'Unauthorized' },
  //       },
  //     }

  //     await service.get('/test').catch(() => {})
  //     //   expect(emitter.emit).toHaveBeenCalledWith(
  //     //     'mock-event',
  //     //     expect.objectContaining({
  //     //       status: 401,
  //     //       data: { error: 'Unauthorized' },
  //     //     }),
  //     //   )
  //     expect(emitter.emit).toHaveBeenCalled()
  //   })
  // })

  // 测试API封装函数
  describe('API Functions', () => {
    beforeEach(() => {})
    it('getBaseUrl should return correct URL', () => {
      expect(getBaseUrl()).toBe('/api/')
    })

    it('getRealUrl should handle URL composition', () => {
      expect(getRealUrl('test')).toBe('/api/test')
      expect(getRealUrl('/test')).toBe('/api/test')
    })

    // it('casGet should send request with params', async () => {
    //   const url = '/test'
    //   const params = { key: 'value' }

    //   await casGet(url, params)

    //   expect(axios.get).toHaveBeenCalledWith('/api/test', expect.objectContaining(params))
    // })

    // it('casPost should stringify params', async () => {
    //   const url = '/test'
    //   const params = { key: 'value' }

    //   await casPost(url, params)

    //   expect(axios.get).toHaveBeenCalledWith(
    //     '/api/test',
    //     'key=value',
    //     expect.objectContaining({
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //       },
    //     }),
    //   )
    // })
  })
})
