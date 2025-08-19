import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EmptyVideo from '@ah/comp/holder/EmptyVideo.vue' // 组件的路径
// 注意：确保路径正确，指向你的组件文件

describe('EmptyVideo.vue', () => {
  it('renders an image with correct src and alt', () => {
    const wrapper = mount(EmptyVideo)
    const img = wrapper.find('img')

    // 检查图片的 src 和 alt 属性
    expect(img.attributes('src')).toBe('/lib/assets/images/empty-video.png')
    expect(img.attributes('alt')).toBe('')
  })

  it('has the correct class names', () => {
    const wrapper = mount(EmptyVideo)

    // 检查 div 和 img 的类名
    expect(wrapper.find('.empty-video').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
