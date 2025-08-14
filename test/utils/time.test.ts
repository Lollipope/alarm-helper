import { describe, it, expect, vi } from 'vitest'
import dayjs from 'dayjs'
import { getLatestInterval, uuid, formatTime } from '../../lib/utils/time'

describe('getLatestInterval', () => {
  it('should return correct startTime and endTime with default params', () => {
    const now = dayjs()
    const { startTime, endTime } = getLatestInterval()
    expect(endTime).toBe(now.format('YYYY-MM-DD HH:mm:ss'))
    expect(startTime).toBe(now.subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'))
  })

  it('should support custom interval and type', () => {
    const now = dayjs()
    const { startTime, endTime } = getLatestInterval(5, 'hour', 'YYYY-MM-DD HH:mm')
    expect(endTime).toBe(now.format('YYYY-MM-DD HH:mm'))
    expect(startTime).toBe(now.subtract(5, 'hour').format('YYYY-MM-DD HH:mm'))
  })
})

describe('uuid', () => {
  it('should generate a valid uuid v4', () => {
    const id = uuid()
    expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    expect(id.length).toBe(36)
  })

  it('should generate different uuids', () => {
    const id1 = uuid()
    const id2 = uuid()
    expect(id1).not.toBe(id2)
  })
})

describe('formatTime', () => {
  it('should format seconds to HH:mm:ss', () => {
    expect(formatTime(0)).toBe('00:00:00')
    expect(formatTime(5)).toBe('00:00:05')
    expect(formatTime(65)).toBe('00:01:05')
    expect(formatTime(3661)).toBe('01:01:01')
    expect(formatTime(36000)).toBe('10:00:00')
  })

  it('should pad single digits with zero', () => {
    expect(formatTime(1)).toBe('00:00:01')
    expect(formatTime(61)).toBe('00:01:01')
    expect(formatTime(3601)).toBe('01:00:01')
  })
})
