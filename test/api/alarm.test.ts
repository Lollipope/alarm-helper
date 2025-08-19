import { describe, it, expect, vi, Mock } from 'vitest'
import * as request from '@ah/api/request'
import {
  getAlarmMsgPage,
  getAlarmConfigListByKindId,
  getUserConfigByAlarmId,
  doHandle,
  readAllMsg,
  getStreamUrl,
  getUserConfigList,
  getConfigMsgKindList,
  getUnReadAlarmMsgInfo,
  readMsgById,
  updateAlarmConfigMsgKindSort,
  stopDevicePlay,
} from '@ah/api/alarm'

// Mocking the `request` module
vi.mock('@ah/api/request', () => ({
  get: vi.fn(),
  put_form: vi.fn(),
  put: vi.fn(),
}))

// Mocking `fetch`
global.fetch = vi.fn()

describe('Alarm API Functions', () => {
  it('should fetch alarm history page successfully', async () => {
    const mockResponse = { data: [] }
    ;(request.get as Mock).mockResolvedValue(mockResponse) // Mocking a resolved response

    const params = { page: 1, limit: 20 }
    const result = await getAlarmMsgPage(params)

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith('/alarm/alarmMg/getAlarmMsgPage', params)
  })

  it('should fetch alarm configuration by kindId', async () => {
    const mockResponse = { data: [{ kindId: 1, name: 'Test' }] }
    ;(request.get as Mock).mockResolvedValue(mockResponse)

    const alarmKindId = 1
    const result = await getAlarmConfigListByKindId(alarmKindId)

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith('/alarm/alarmConfigMsg/getAlarmConfigListByKindId', {
      alarmKindId: 1,
    })
  })

  it('should fetch user config by alarmId', async () => {
    const mockResponse = { data: { userId: 123, alarmId: 456 } }
    ;(request.get as Mock).mockResolvedValue(mockResponse)

    const alarmId = 456
    const result = await getUserConfigByAlarmId(alarmId)

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith(
      `/alarm/alarmConfigMsgUser/getUserConfigByAlarmId?alarmId=${alarmId}`,
    )
  })
  it('should fetch user config ', async () => {
    const mockResponse = { data: { userId: 123, alarmId: 456 } }
    ;(request.get as Mock).mockResolvedValue(mockResponse)

    const result = await getUserConfigList()

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith(`/alarm/alarmConfigMsgUser/getUserConfigList`)
  })
  it('should fetch getUnReadAlarmMsgInfo ', async () => {
    const mockResponse = { data: { userId: 123, alarmId: 456 } }
    ;(request.get as Mock).mockResolvedValue(mockResponse)
    const result = await getUnReadAlarmMsgInfo()

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith(`/alarm/alarmMg/getUnReadAlarmMsgInfo`)
  })
  it('should fetch getConfigMsgKindList ', async () => {
    const mockResponse = { data: { userId: 123, alarmId: 456 } }
    ;(request.get as Mock).mockResolvedValue(mockResponse)
    const params = { alarmKindId: 1, isShow: 1, sort: 2, alarmKindName: '' }
    const result = await getConfigMsgKindList(params)

    expect(result).toEqual(mockResponse)
    expect(request.get).toHaveBeenCalledWith(
      `/alarm/alarmConfigMsgKind/getConfigMsgKindList`,
      params,
    )
  })

  it('updateAlarmConfigMsgKindSort should success', async () => {
    const mockResponse = { data: null }
    ;(request.put as Mock).mockResolvedValue(mockResponse)

    const params = { alarmKindId: 1, isShow: 1, sort: 2, alarmKindName: '' }
    const result = await updateAlarmConfigMsgKindSort(params)

    expect(result).toEqual(mockResponse)
    expect(request.put).toHaveBeenCalledWith(
      '/alarm/alarmConfigMsgKind/updateAlarmConfigMsgKindSort',
      params,
    )
  })
  it('should readAllMsg', async () => {
    const mockResponse = { data: null }
    ;(request.put_form as Mock).mockResolvedValue(mockResponse)

    const params = { alarmKindId: 'xxxxx' }
    const result = await readAllMsg(params)

    expect(result).toEqual(mockResponse)
    expect(request.put_form).toHaveBeenCalledWith('/alarm/alarmMg/readAllMsg', params)
  })
  it('should readMsgById', async () => {
    const mockResponse = { data: null }
    ;(request.put_form as Mock).mockResolvedValue(mockResponse)

    const params = 'msgId-12345'
    const result = await readMsgById(params)

    expect(result).toEqual(mockResponse)
    expect(request.put_form).toHaveBeenCalledWith('/alarm/alarmMg/readMsgById', { msgId: params })
  })
  it('should handle an alarm', async () => {
    const mockResponse = { data: null }
    ;(request.put_form as Mock).mockResolvedValue(mockResponse)

    const params = { alarmId: 1, status: 'handled' }
    const result = await doHandle(params)

    expect(result).toEqual(mockResponse)
    expect(request.put_form).toHaveBeenCalledWith('/alarm/alarmMg/doHandle', params)
  })

  it('should handle fetch stream URL', async () => {
    const mockResponse = { url: 'http://example.com' }
    ;(global.fetch as Mock).mockResolvedValue({
      json: () => mockResponse,
    })

    const params = { deviceId: 1 }
    const result = await getStreamUrl(params)

    expect(result).toEqual(mockResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('alarm/stream/getDeviceUrl'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(params),
      }),
    )
  })

  it('should handle stop stream device', async () => {
    const mockResponse = { status: 'success' }
    ;(global.fetch as Mock).mockResolvedValue({
      json: () => mockResponse,
    })

    const params = { deviceId: 1 }
    const result = await stopDevicePlay(params)

    expect(result).toEqual(mockResponse)
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('alarm/stream/stopDevicePlay'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    )
  })
})
