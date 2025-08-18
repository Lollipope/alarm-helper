import { vi } from 'vitest'

// 模拟 Audio 和 speechSynthesis
export const audioMock = {
  play: vi.fn(),
  pause: vi.fn(),
  currentTime: 0,
  src: '',
}

export const speechSynthesisMock = {
  speak: vi.fn(),
  cancel: vi.fn(),
}

// 模拟 global 中的 Audio 和 speechSynthesis
vi.stubGlobal(
  'Audio',
  vi.fn().mockImplementation(() => audioMock),
)
vi.stubGlobal('speechSynthesis', speechSynthesisMock)
// 在测试文件顶部模拟 SpeechSynthesisUtterance
const SpeechSynthesisUtterance = vi.fn((text) => ({
  // 你可以根据需要为这个对象添加方法和属性
  text,
  lang: '',
  pitch: 1,
  rate: 1,
  volume: 1,
  onstart: vi.fn(),
  onend: vi.fn(),
  onerror: vi.fn(),
  // 添加更多属性或方法，视具体需求而定
}))
vi.stubGlobal('SpeechSynthesisUtterance', SpeechSynthesisUtterance)
