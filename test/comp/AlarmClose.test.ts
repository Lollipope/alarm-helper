import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AlarmHelperClose from '@ah/comp/alarm-close/AlarmClose.vue' // 组件的路径

describe('AlarmHelperClose.vue', () => {
  it('should render the component with correct class', () => {
    const wrapper = mount(AlarmHelperClose)
    const divElement = wrapper.find('.alarm-close')

    // 确保组件渲染了 .alarm-close 类的 div 元素
    expect(divElement.exists()).toBe(true)
    expect(divElement.classes()).toContain('alarm-close')
  })
})
