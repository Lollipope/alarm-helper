import { describe, it, expect, vi, Mock } from 'vitest'
import * as request from '@ah/api/request'
import { getDictionaryListByKey, updateRemark, getSectionList } from '@ah/api/common'
// Mocking the `request` module
vi.mock('@ah/api/request', () => ({
  get: vi.fn(),
  put_form: vi.fn(),
}))

describe('API utils', () => {
  describe('getDictionaryListByKey', () => {
    it('should call the correct API and return dictionary list', async () => {
      const mockResponse = { data: [{ key: 'value' }] }
      ;(request.get as Mock).mockResolvedValue(mockResponse) // Mock get请求返回的结果

      const result = await getDictionaryListByKey('testKey')

      expect(request.get).toHaveBeenCalledWith('/alarm/alarmDictionary/getDictionaryListByKey', {
        key: 'testKey',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle error if request fails', async () => {
      ;(request.get as Mock).mockRejectedValue(new Error('Network Error')) // Mock失败的请求

      try {
        await getDictionaryListByKey('testKey')
      } catch (error: any) {
        expect(error.message).toBe('Network Error')
      }
    })
  })

  describe('updateRemark', () => {
    it('should call the correct API to update remark', async () => {
      const mockResponse = { data: null, message: 'success' }
      ;(request.put_form as Mock).mockResolvedValue(mockResponse) // Mock put请求返回的结果

      const result = await updateRemark('msgId123', 'New Remark')

      expect(request.put_form).toHaveBeenCalledWith('/alarm/alarmMg/updateRemark', {
        msgId: 'msgId123',
        remark: 'New Remark',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should handle error if request fails', async () => {
      ;(request.put_form as Mock).mockRejectedValue(new Error('Network Error')) // Mock失败的请求

      try {
        await updateRemark('msgId123', 'New Remark')
      } catch (error: any) {
        expect(error.message).toBe('Network Error')
      }
    })
  })

  describe('getSectionList', () => {
    it('should call the correct API to get section list', async () => {
      const mockResponse = { data: [{ section: 'section1' }] }
      ;(request.get as Mock).mockResolvedValue(mockResponse) // Mock get请求返回的结果

      const result = await getSectionList()

      expect(request.get).toHaveBeenCalledWith('/alarm/alarmMg/getSectionList')
      expect(result).toEqual(mockResponse)
    })

    it('should handle error if request fails', async () => {
      ;(request.get as Mock).mockRejectedValue(new Error('Network Error')) // Mock失败的请求

      try {
        await getSectionList()
      } catch (error: any) {
        expect(error.message).toBe('Network Error')
      }
    })
  })
})
