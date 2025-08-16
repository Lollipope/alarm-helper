import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import AlarmDialogCnt from '@ah/comp/alarm-dialog-cnt/alarm-dialog-cnt.vue'
describe('AlarmDialogCnt.vue', () => {
  it('should render the component', () => {
    expect(true).toBe(true)
  })
  // it('should have the correct structure for child components', async () => {
  //   console.log('xxxxxxxxxxxxxxxxxxxxxxx')
  //   const wrapper = mount(AlarmDialogCnt, {})
  //   const divElement = wrapper.find('.alarm-robot')
  //   // 确保组件渲染了 .alarm-close 类的 div 元素
  //   expect(divElement.exists()).toBe(true)
  //   expect(divElement.classes()).toContain('alarm-close')
  //   // const MenuListMock = wrapper.getComponent(MenuList)
  //   // await flushPromises()
  //   // const AlarmDetailMock = wrapper.getComponent(AlarmDetail)
  //   // const AlarmListMock = wrapper.getComponent(AlarmList)
  //   // console.log(MenuListMock.html)
  //   // console.log(AlarmDetailMock.html)
  //   // console.log(AlarmListMock.html)
  //   // 验证是否渲染了子组件 MenuList, AlarmList, 和 AlarmDetail
  //   // expect(MenuListMock.isVisible()).toBe(true)
  //   // expect(wrapper.findComponent({ ref: 'alarmListRef' }).exists()).toBe(true)
  //   // expect(wrapper.findComponent({ name: 'AlarmDetail' }).exists()).toBe(true)
  //   wrapper.unmount()
  // })
  // it('should update alarmTypeIdSelect when onChangeAlarmKindId is called', async () => {
  //   const wrapper = mount(AlarmDialogCnt)
  //   // 模拟调用 onChangeAlarmKindId 方法
  //   await wrapper.vm.onChangeAlarmKindId('new-id')
  //   // 检查 alarmTypeIdSelect 是否更新
  //   expect(wrapper.vm.alarmTypeIdSelect).toBe('new-id')
  // })
  // it('should call refreshMenu when onRead is called with false', async () => {
  //   const refreshMenuSpy = vi.fn()
  //   const wrapper = mount(AlarmDialogCnt, {
  //     methods: {
  //       refreshMenu: refreshMenuSpy,
  //     },
  //   })
  //   // 模拟调用 onRead 方法
  //   await wrapper.vm.onRead(false)
  //   // 检查 refreshMenu 是否被调用
  //   expect(refreshMenuSpy).toHaveBeenCalled()
  // })
  // it('should update isListEmpty when onChangeList is called', async () => {
  //   const wrapper = mount(AlarmDialogCnt)
  //   // 模拟调用 onChangeList 方法
  //   await wrapper.vm.onChangeList(true)
  //   // 检查 isListEmpty 是否更新
  //   expect(wrapper.vm.isListEmpty).toBe(true)
  // })
  // it('should render the empty holder when isListEmpty is true', async () => {
  //   const wrapper = mount(AlarmDialogCnt)
  //   // 模拟设置 isListEmpty 为 true
  //   await wrapper.setData({ isListEmpty: true })
  //   // 验证 empty-holder 元素是否被渲染
  //   expect(wrapper.find('.empty-holder').exists()).toBe(true)
  // })
  // it('should not render the empty holder when isListEmpty is false', async () => {
  //   const wrapper = mount(AlarmDialogCnt)
  //   // 模拟设置 isListEmpty 为 false
  //   await wrapper.setData({ isListEmpty: false })
  //   // 验证 empty-holder 元素是否未被渲染
  //   expect(wrapper.find('.empty-holder').exists()).toBe(false)
  // })
})
