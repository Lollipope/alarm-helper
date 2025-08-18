import { describe, it, expect, vi, Mock } from 'vitest'
import * as auth from '@ah/api/auth' // 引入你的工具函数
import Cookies from 'js-cookie'

// Mock window.localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  clear: vi.fn(),
  key: vi.fn(),
}

// Mock js-cookie
vi.mock('js-cookie', async (importOriginal) => {
  const originalModule = await importOriginal()
  console.log('importOriginal:', originalModule)
  return {
    default: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  }
})

describe('auth utils', () => {
  describe('getToken', () => {
    it('should return token from Cookies if available', () => {
      ;(Cookies.get as Mock).mockReturnValue('cookie-token') // Mock返回cookie的token
      const token = auth.getToken()
      expect(token).toBe('cookie-token')
      expect(Cookies.get).toHaveBeenCalledWith('x-auth-token')
    })

    it('should return token from localStorage if cookie is not available', () => {
      ;(Cookies.get as Mock).mockReturnValue(null) // Mock返回cookie为空
      ;(global.localStorage.getItem as Mock).mockReturnValue('local-storage-token') // Mock返回localStorage的token
      const token = auth.getToken()
      expect(token).toBe('local-storage-token')
      expect(global.localStorage.getItem).toHaveBeenCalledWith('cdp-token')
    })

    it('should return null if no token is found', () => {
      ;(Cookies.get as Mock).mockReturnValue(null)
      ;(global.localStorage.getItem as Mock).mockReturnValue(null)
      const token = auth.getToken()
      expect(token).toBeNull()
    })
  })

  describe('setToken', () => {
    it('should set token to Cookies', () => {
      auth.setToken('new-token')
      expect(Cookies.set).toHaveBeenCalledWith('x-auth-token', 'new-token')
    })
  })

  describe('removeToken', () => {
    it('should remove token from Cookies', () => {
      auth.removeToken()
      expect(Cookies.remove).toHaveBeenCalledWith('x-auth-token')
    })
  })

  describe('setLocalStorageToken', () => {
    it('should set token to localStorage', () => {
      auth.setLocalStorageToken('local-token')
      expect(global.localStorage.setItem).toHaveBeenCalledWith('cdp-token', 'local-token')
    })
  })

  describe('getLocalStorageToken', () => {
    it('should return token from localStorage by default', () => {
      ;(global.localStorage.getItem as Mock).mockReturnValue('local-storage-token')
      const token = auth.getLocalStorageToken()
      expect(token).toBe('local-storage-token')
      expect(global.localStorage.getItem).toHaveBeenCalledWith('cdp-token')
    })

    it('should return token from localStorage with custom name', () => {
      ;(global.localStorage.getItem as Mock).mockReturnValue('custom-local-storage-token')
      const token = auth.getLocalStorageToken('custom-token-key')
      expect(token).toBe('custom-local-storage-token')
      expect(global.localStorage.getItem).toHaveBeenCalledWith('custom-token-key')
    })
  })

  describe('removeLocalStorageToken', () => {
    it('should remove token from localStorage', () => {
      auth.removeLocalStorageToken()
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('cdp-token')
    })
  })
})
