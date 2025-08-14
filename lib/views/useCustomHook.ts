import {
  shallowRef,
  ref,
  watch,
  nextTick,
  ModelRef,
  Ref,
  type ShallowRef,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useEventListener } from '@vueuse/core'
import { emitter, EmitEventApi } from '../utils'
// 初始化缩放比例
function initScale() {
  const scale = window.screen.width / 1920
  return scale === 1 ? scale : 0.8 // 只有1920的屏幕才原尺寸展示,其余都是0.8倍缩放
}
/**
 * 弹窗状态 hook
 * @param visible 弹窗可见度
 * @returns
 */
export function useAlarmDialogDragState(visible: ModelRef<boolean>) {
  // 缩放比例
  const scaleVal = ref(initScale())
  // 弹窗元素
  const customModal = shallowRef() as ShallowRef<HTMLElement>
  // 弹窗位置,弹窗拖拽开始和结束事件
  const { position, startDrag, updatePos } = useMouseMove(customModal, scaleVal)
  // 关闭弹窗
  const closeModal = () => {
    visible.value = false
  }
  // 可见度改变
  function handleVisibleChange(visible: boolean) {
    if (!visible) {
      return
    }
    nextTick().then(() => {
      updatePos()
    })
  }
  // 监听弹窗可见度
  watch(visible, (newVal) => handleVisibleChange(newVal), {
    immediate: true,
  })
  // 监听浏览器视口改变
  useEventListener(window, 'resize', () => updatePos())

  return {
    position,
    customModal,
    startDrag,
    scaleVal,
    closeModal,
  }
}
/**
 * 处理鼠标移动的自定Hook函数
 * @param {ShallowRef} customModal 弹窗ref
 * @param {Ref } scaleVal 弹窗缩放比例
 * @returns {}
 */
function useMouseMove(customModal: ShallowRef<HTMLElement>, scaleVal: Ref<number>) {
  const position = ref({ top: 0, left: 0 }) // 弹窗位置
  const startPos = { x: 0, y: 0 }

  let isDragging = false
  const startDrag = (e: MouseEvent) => {
    isDragging = true
    startPos.x = e.clientX - position.value.left
    startPos.y = e.clientY - position.value.top
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
  // 开始拖拽
  const onDrag = (e: MouseEvent) => {
    if (isDragging) {
      const bodyWidth = document.body.clientWidth
      const bodyHeight = document.body.clientHeight
      const customModalWidth = customModal.value.offsetWidth * scaleVal.value // 弹窗宽度
      const customModalHeight = customModal.value.offsetHeight * scaleVal.value // 弹窗高度
      let newLeft = e.clientX - startPos.x
      let newTop = e.clientY - startPos.y

      // 限制弹窗左边界不超出
      if (newLeft < 0) newLeft = 0
      // 限制弹窗右边界不超出
      if (newLeft + customModalWidth > bodyWidth) newLeft = bodyWidth - customModalWidth
      // 限制弹窗上边界不超出
      if (newTop < 0) newTop = 0
      // 限制弹窗下边界不超出
      if (newTop + customModalHeight > bodyHeight) newTop = bodyHeight - customModalHeight

      position.value.left = newLeft
      position.value.top = newTop
    }
  }
  // 停止拖拽
  const stopDrag = () => {
    isDragging = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }

  //更新位置
  function updatePos() {
    const bodyWidth = document.body.clientWidth
    const bodyHeight = document.body.clientHeight
    const customModalWidth = customModal.value?.clientWidth * scaleVal.value // 弹窗宽度
    const customModalHeight = customModal.value?.clientHeight * scaleVal.value // 假设弹窗初始高度为160px，您可以根据内容自适应
    // 设置初始位置，使弹窗居中
    position.value.left = Math.max(bodyWidth - Math.floor(customModalWidth), 0)
    position.value.top = Math.max(bodyHeight - Math.floor(customModalHeight), 0)
  }

  return {
    position,
    startDrag,
    updatePos,
  }
}

/**
 * 接口异常回调hook
 * @param {Fucntion} fn 接口异常回调函数
 */
export function useApiError(fn: (t: unknown) => void) {
  onMounted(() => {
    emitter.on(EmitEventApi, fn)
  })

  onBeforeUnmount(() => {
    emitter.off(EmitEventApi, fn)
  })
}
/**
 * 更新标记
 * @returns
 */
export function useRefresh() {
  const isNew = ref(true)
  function updateNew() {
    isNew.value = false
    nextTick(() => {
      isNew.value = true
    })
  }

  return {
    isNew,
    updateNew,
  }
}
