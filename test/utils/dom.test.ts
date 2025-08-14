/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkVideoPlayable } from '../../lib/utils/dom'

describe('测试dom文件', () => {
  let createElementSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    createElementSpy = vi.spyOn(document, 'createElement') as ReturnType<typeof vi.spyOn>
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('checkVideoPlayable should resolve url when video can play', async () => {
    const mockVideo: any = {
      src: '',
      load: vi.fn(),
    }
    createElementSpy.mockReturnValue(mockVideo)
    const url = `https://www.runoob.com/try/demo_source/movie.mp4`
    const promise = checkVideoPlayable(url)

    // 模拟 oncanplay 事件
    setTimeout(() => mockVideo.oncanplay(), 0)

    await expect(promise).resolves.toBe(url)
    expect(mockVideo.src).toBe(url)
    expect(mockVideo.load).toHaveBeenCalled() // 确保调用了 load()
  })

  it('checkVideoPlayable should resolve null when video cannot play', async () => {
    const mockVideo: any = {
      src: '',
      load: vi.fn(),
    }
    createElementSpy.mockReturnValue(mockVideo)
    const url = `https://www.runoob.com/try/demo_source/movie2.mp4`
    const promise = checkVideoPlayable(url)

    // 模拟 onerror 事件
    setTimeout(() => mockVideo.onerror(), 0)

    await expect(promise).resolves.toBeNull()
    expect(mockVideo.src).toBe(url)
    expect(mockVideo.load).toHaveBeenCalled() // 确保调用了 load()
  })
})
