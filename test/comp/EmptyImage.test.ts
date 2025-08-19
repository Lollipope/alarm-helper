import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import EmptyImage from '@ah/comp/holder/EmptyImage.vue'

describe('EmptyImage.vue', () => {
  it('renders an image with correct src and alt', () => {
    const wrapper = mount(EmptyImage)
    const img = wrapper.find('img')

    // 检查图片的 src 和 alt 属性
    expect(img.attributes('src')).toBe('/lib/assets/images/empty-image.png')
    expect(img.attributes('alt')).toBe('')
  })

  it('has the correct class names', () => {
    const wrapper = mount(EmptyImage)

    // 检查 div 和 img 的类名
    expect(wrapper.find('.empty-video').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
  })
})
