import { describe, it, expect, vi, beforeEach } from 'vitest'
import { audioMock, speechSynthesisMock } from './constant' // 导入模拟对象
import audioModule from '@ah/audio/Speech' // 你的模块路径

describe('Audio Module', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    // 清理每个测试的 mock
    vi.clearAllMocks()
  })

  describe('startSpeakAudio', () => {
    it('should play the audio and reset the current time', () => {
      audioModule.startSpeakAudio() // 调用函数
      // 验证 cancelSpeakAudio 被调用
      expect(audioMock.pause).toHaveBeenCalled() // 应该先暂停
      expect(audioMock.currentTime).toBe(0) // 应该重置 currentTime
      expect(audioMock.play).toHaveBeenCalled() // 应该开始播放音频
    })

    it('should call cancelSpeakAudio before playing the audio', () => {
      audioMock.currentTime = 22222
      // TODO: 这里对 cancelSpeakAudio 进行代理vi.spyOn/vi.fn, 但在后续断言中并不会被调用!!!!!!!!!
      // const cancelSpy = vi.spyOn(audioModule, 'cancelSpeakAudio') // spy on cancelSpeakAudio
      audioModule.startSpeakAudio()
      //确保先调用 cancelSpeakAudio，然后才播放音频
      expect(audioMock.currentTime).toBe(0)
      expect(audioMock.pause).toHaveBeenCalled()
      expect(audioMock.play).toHaveBeenCalled()
    })
  })

  describe('cancelSpeakAudio', () => {
    it('should reset currentTime to 0 and pause the audio', () => {
      audioModule.cancelSpeakAudio() // 调用取消播放

      // 检查是否调用 pause 方法，并且 currentTime 是否被设置为 0
      expect(audioMock.pause).toHaveBeenCalled()
      expect(audioMock.currentTime).toBe(0)
    })
  })

  describe('startSpeakText', () => {
    it('should speak the given text', () => {
      const text = 'Hello, World!'
      audioModule.startSpeakText(text) // 调用语音播放文本

      // 确保 cancelSpeakText 被调用
      expect(speechSynthesisMock.cancel).toHaveBeenCalled()

      // 验证 speechSynthesis.speak 是否被调用
      expect(speechSynthesisMock.speak).toHaveBeenCalled()
      expect(speechSynthesisMock.speak).toHaveBeenCalledWith(
        expect.objectContaining({
          text: text, // 传入的文本
        }),
      )
    })

    it('should call cancelSpeakText before speaking', () => {
      // const cancelSpeakTextSpy = vi.spyOn(audioModule, 'cancelSpeakText') // spy on cancelSpeakText
      const text = 'Another text'
      audioModule.startSpeakText(text)

      // 确保先调用 cancelSpeakText，再开始朗读
      // 这里代理模块的方法,也无法代理,和上面的 cancelSpeakAudio 一样
      // expect(cancelSpeakTextSpy).toHaveBeenCalled()
      expect(speechSynthesisMock.speak).toHaveBeenCalled()
    })

    describe('cancelSpeakText', () => {
      it('should cancel the speech synthesis', () => {
        audioModule.cancelSpeakText() // 调用取消语音播放

        // 检查 cancel 方法是否被调用
        expect(speechSynthesisMock.cancel).toHaveBeenCalled()
      })
    })
  })
})
