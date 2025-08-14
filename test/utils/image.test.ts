import { vi, test, expect, beforeEach, describe } from 'vitest'
import {
  getAlarmTypeImgUrl,
  getAlarmSmallTypeImgUrl,
  AlarmTypeIds,
  AlarmTypeList,
} from '../../lib/utils/image' // 根据实际路径导入你的模块

describe('测试image文件', () => {
  // 每个测试前都清除 mock 函数
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('getAlarmTypeImgUrl should return the correct image URL for a given alarm type', () => {
    const name = '01'
    const expectedUrl = new URL(
      `../../lib/assets/images/alarm-type/alarm-type${name}.png`,
      import.meta.url,
    ).href

    const result = getAlarmTypeImgUrl(name)
    expect(result).toBe(expectedUrl)
  })

  test('getAlarmSmallTypeImgUrl should return the correct small image URL for a given alarm type', () => {
    const name = '001'
    const expectedUrl = new URL(
      `../../lib/assets/images/alarm-msg/icon${name}.png`,
      import.meta.url,
    ).href
    const result = getAlarmSmallTypeImgUrl(name)

    expect(result).toBe(expectedUrl)
  })

  test('should have correct image URLs for all alarm types', () => {
    AlarmTypeList.slice(1).forEach((item) => {
      const expectedLargeImgUrl = new URL(
        `../../lib/assets/images/alarm-type/alarm-type${String(item.id).padStart(2, '0')}.png`,
        import.meta.url,
      ).href
      const expectedSmallImgUrl = new URL(
        `../../lib/assets/images/alarm-type/alarm-type${String(item.id).padStart(2, '0')}s.png`,
        import.meta.url,
      ).href

      expect(item.imgUrl).toBe(expectedLargeImgUrl)
      expect(item.imgUrlS).toBe(expectedSmallImgUrl)
    })
  })

  test('should have correct names and ids for each alarm type', () => {
    AlarmTypeList.forEach((item) => {
      expect(item.id).toBeDefined()
      expect(item.name).toBeDefined()
    })
  })

  test('should have correct AlarmTypeIds for each alarm type', () => {
    expect(AlarmTypeIds.SDJC).toBe(1)
    expect(AlarmTypeIds.SFZJC).toBe(2)
    expect(AlarmTypeIds.FLJC).toBe(3)
    // Add more tests for other IDs if needed
  })
})
