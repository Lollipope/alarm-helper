import { describe, it, expect, vi } from 'vitest'
import { emitter, EmitEventApi } from '@ah/utils'

// lib/utils/bus.test.ts

describe('bus.ts', () => {
  it('EmitEventApi should be "$alarmhelper"', () => {
    expect(EmitEventApi).toBe('$alarmhelper')
  })

  it('emitter should emit and listen to events', () => {
    const handler = vi.fn()
    emitter.on('test-event', handler)
    emitter.emit('test-event', { foo: 'bar' })
    expect(handler).toHaveBeenCalledWith({ foo: 'bar' })
    emitter.off('test-event', handler)
  })

  it('emitter should not call handler after off', () => {
    const handler = vi.fn()
    emitter.on('test-event', handler)
    emitter.off('test-event', handler)
    emitter.emit('test-event', { foo: 'bar' })
    expect(handler).not.toHaveBeenCalled()
  })
})
