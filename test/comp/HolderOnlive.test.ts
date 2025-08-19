import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HolderOnlive from '@ah/comp/holder/HolderOnlive.vue' // 组件的路径

describe('HolderOnlive.vue', () => {
  it('renders the button with correct src and alt attributes', () => {
    const wrapper = mount(HolderOnlive)
    const img = wrapper.find('img')

    // 检查图片的 src 和 alt 属性
    expect(img.attributes('src')).toBe('/lib/assets/images/btn-play.png')
    expect(img.attributes('alt')).toBe('')
  })

  it('emits "trigger" event when the button is clicked', async () => {
    const wrapper = mount(HolderOnlive, {
      emit: ['trigger'], // 自定义事件
    })
    const img = wrapper.find('img')

    // 模拟点击事件
    await img.trigger('click')

    // 确认事件被触发
    expect(wrapper.emitted()).toHaveProperty('trigger')
    expect(wrapper.emitted('trigger')).toHaveLength(1)
  })
})
