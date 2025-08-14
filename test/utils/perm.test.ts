import { describe, it, expect, vi } from 'vitest'
import { syncUserPermConfig, getGoSysParams, ViewTagType, defaultPerm } from '../../lib/utils/perm'
import { AlarmRobotApi } from '../../lib/api'

vi.mock('../../lib/api', () => ({
  AlarmRobotApi: {
    getUserConfigByAlarmId: vi.fn(),
  },
}))

describe('perm utils', () => {
  it('ViewTagType and defaultPerm should be defined', () => {
    expect(ViewTagType.LIVE).toBe(1)
    expect(defaultPerm).toHaveProperty('system')
    expect(defaultPerm).toHaveProperty('live')
    expect(defaultPerm).toHaveProperty('pic')
    expect(defaultPerm).toHaveProperty('record')
    expect(defaultPerm).toHaveProperty('fallback')
    expect(defaultPerm).toHaveProperty('audio')
  })

  it('syncUserPermConfig should map permissions correctly', async () => {
    const mockData = {
      handleUrl: 'http://test.com',
      isSupportReport: true,
      paramList: [{ paramCode: 'a', defaultValue: '1', paramFieldName: 'f1' }],
      alarmConfigViewList: [
        { viewTag: ViewTagType.LIVE },
        { viewTag: ViewTagType.PIC },
        { viewTag: ViewTagType.RECORD },
        { viewTag: ViewTagType.FALLBACK },
        { viewTag: ViewTagType.AUDIO },
      ],
    }
    ;(AlarmRobotApi.getUserConfigByAlarmId as any).mockResolvedValue({ data: mockData })

    const result = await syncUserPermConfig('123')
    expect(result.system.perm).toBe(true)
    expect(result.system.url).toBe('http://test.com')
    expect(result.system.btn).toBe(true)
    expect(result.system.paramList.length).toBe(1)
    expect(result.live.perm).toBe(true)
    expect(result.pic.perm).toBe(true)
    expect(result.record.perm).toBe(true)
    expect(result.fallback.perm).toBe(true)
    expect(result.audio.perm).toBe(true)
  })

  it('syncUserPermConfig should handle missing alarmConfigViewList', async () => {
    const mockData = {
      handleUrl: '',
      isSupportReport: false,
      paramList: [],
      alarmConfigViewList: [],
    }
    ;(AlarmRobotApi.getUserConfigByAlarmId as any).mockResolvedValue({ data: mockData })

    const result = await syncUserPermConfig('456')
    expect(result.system.perm).toBe(false)
    expect(result.live.perm).toBe(false)
    expect(result.pic.perm).toBe(false)
    expect(result.record.perm).toBe(false)
    expect(result.fallback.perm).toBe(false)
    expect(result.audio.perm).toBe(false)
  })

  it('getGoSysParams should build query string correctly', () => {
    const params = [
      { paramCode: 'a', defaultValue: '1', paramFieldName: 'f1' },
      { paramCode: 'b', paramFieldName: 'f2' },
    ]
    const infoObj = { f2: 'v2' }
    const msgId = 'msg123'
    const result = getGoSysParams(params, infoObj, msgId)
    expect(result).toBe('?msgId=msg123&a=1&b=v2')
  })

  it('getGoSysParams should handle empty params', () => {
    const result = getGoSysParams([], {}, 'msg999')
    expect(result).toBe('?msgId=msg999&')
  })
})
