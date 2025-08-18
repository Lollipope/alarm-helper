import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, it, expect } from 'vitest'
import AlarmHelperConfirm from '@ah/comp/alarm-confirm/AlarmConfirm.vue'

describe('AlarmHelperConfirm Component', () => {
  it('should render the component when modelValue is true', async () => {
    const wrapper = mount(AlarmHelperConfirm, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })
    // 等待 Vue 更新 DOM
    await nextTick()
    await nextTick()
    // // 检查组件渲染
    expect(wrapper.find('.alarm-confirm').exists()).toBe(true)
    expect(wrapper.find('.alarm-confirm-content').exists()).toBe(true)
  })

  it('should not render the component when modelValue is false', async () => {
    const wrapper = mount(AlarmHelperConfirm, {
      props: {
        modelValue: false,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    })

    // 检查组件未渲染
    expect(wrapper.find('.alarm-confirm').exists()).toBe(false)
  })

  it('should emit "onYes" when confirm button is clicked', async () => {
    const wrapper = mount(AlarmHelperConfirm, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
      emit: ['onYes'], // 自定义事件
    })

    // 点击确认按钮
    await wrapper.find('.confirm').trigger('click')

    // 检查事件是否触发
    expect(wrapper.emitted()).toHaveProperty('onYes')
  })

  it('should emit "onNo" when cancel button is clicked', async () => {
    const wrapper = mount(AlarmHelperConfirm, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
      emit: ['onNo'], // 自定义事件
    })

    // 点击取消按钮
    await wrapper.find('.cancel').trigger('click')

    // 检查事件是否触发
    expect(wrapper.emitted()).toHaveProperty('onNo')
  })

  it('should render slot content correctly', async () => {
    const wrapper = mount(AlarmHelperConfirm, {
      props: {
        modelValue: true,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
      slots: {
        default: '<span>Custom Slot Content</span>',
      },
    })

    // 检查slot内容
    expect(wrapper.find('.option span').text()).toBe('Custom Slot Content')
  })
})
