import { ref, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { AlarmRobotApi } from '@ah/api'
import type { AnimatorProps } from './Animator'
export type MoveCallback = (
  e: PointerEvent,
  dx: number,
  dy: number,
  absDx: number,
  absDy: number,
  initX: number,
  initY: number,
) => void
export type StartCallback = (e: PointerEvent) => void
export type EndCallback = (e: PointerEvent) => void

export function createDrag(
  target: Ref<HTMLElement | null>,
  callbacks: {
    onStart?: StartCallback
    onMove?: MoveCallback
    onEnd?: EndCallback
  },
) {
  const dragging = ref(false)
  const dragMoved = ref(false)
  let startX = 0
  let startY = 0
  let initX = 0
  let initY = 0

  function onPointerDown(e: PointerEvent) {
    if (!target.value) return
    dragging.value = true
    dragMoved.value = false
    startX = e.clientX
    startY = e.clientY
    // caller may set initX/initY based on external state
    initX = 0
    initY = 0
    target.value.setPointerCapture?.(e.pointerId)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    callbacks.onStart?.(e)
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging.value) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    if (!dragMoved.value && (absDx > 4 || absDy > 4)) {
      dragMoved.value = true
    }
    callbacks.onMove?.(e, dx, dy, absDx, absDy, initX, initY)
  }

  function onPointerUp(e: PointerEvent) {
    if (!dragging.value) return
    dragging.value = false
    target.value?.releasePointerCapture?.(e.pointerId)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    callbacks.onEnd?.(e)
  }

  function destroy() {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }

  onBeforeUnmount(destroy)

  return {
    dragging,
    dragMoved,
    onPointerDown,
    destroy,
    // allow accessors for start/init values if needed by caller
    _setInit: (ix: number, iy: number) => {
      initX = ix
      initY = iy
    },
  }
}
export const animateDuration = 10000
export function useMsgNew(props: AnimatorProps, isNew: Ref<boolean>) {
  let isNewTimerId: any
  watch(
    () => Number(props.unRead.num),
    (newVal, oldVal) => oldVal != -1 && showMsgNew(newVal),
  )
  function showMsgNew(count: number) {
    if (count <= 0) {
      isNew.value = false
      return
    }
    // 有新消息来到
    isNew.value = true
    isNewTimerId = setTimeout(() => (isNew.value = false), animateDuration)
  }
  function clearNew() {
    isNewTimerId && clearTimeout(isNewTimerId)
  }
  onBeforeUnmount(() => {
    clearNew()
  })
  return {
    clearNew,
  }
}
export function useMsgIpmt(isIpmt: Ref<boolean>, isImportant: ComputedRef<boolean>) {
  let isIpmtTimerId: any

  watch(
    () => isImportant.value,
    (newVal) => showMsgImpt(newVal),
    {
      immediate: true,
    },
  )
  function showMsgImpt(newVal: boolean) {
    // 有重要消息来到
    if (newVal) {
      isIpmt.value = true
      isIpmtTimerId = setTimeout(() => (isIpmt.value = false), animateDuration)
    }
  }
  function clearIpmt() {
    isIpmtTimerId && clearTimeout(isIpmtTimerId)
  }
  onBeforeUnmount(() => {
    clearIpmt()
  })
  return {
    clearIpmt,
  }
}
export function useMsg(props: AnimatorProps) {
  const isNew = ref(false)
  const isIpmt = ref(false)
  const isImportant = computed(() => {
    return props.unRead.isLevelTop || props.unRead.isMajor
  })

  const { clearNew } = useMsgNew(props, isNew)
  const { clearIpmt } = useMsgIpmt(isIpmt, isImportant)
  watch(
    () => isIpmt.value,
    (val) => {
      if (val) {
        clearNew()
      }
    },
  )
  watch(
    () => isNew.value,
    (val) => {
      if (val) {
        clearIpmt()
      }
    },
  )

  return {
    isNew,
    clearNew,
    isIpmt,
    clearIpmt,
  }
}

export function useMessageThreshold() {
  const threshold = ref(10000)
  onMounted(() => {
    AlarmRobotApi.getAlarmConfigMsgUserPage().then((res: any) => {
      const ret = (res.data || []).find((it: any) => it.code === 'messageThreshold')
      if (!ret) return
      threshold.value = Number(ret.paramValue) || 10000
    })
  })

  return {
    threshold,
  }
}

export function useForceMessage(props: AnimatorProps) {
  const isForce = ref(false)
  const { threshold } = useMessageThreshold()
  let forceTimeout: NodeJS.Timeout
  let forceTickTimtout: NodeJS.Timeout
  const runForce = () => {
    isForce.value = true
    forceTickTimtout = setTimeout(() => {
      isForce.value = false
    }, animateDuration)
  }
  const stopForce = () => {
    forceTickTimtout && clearTimeout(forceTickTimtout)
    forceTimeout && clearInterval(forceTimeout)
  }
  watch(
    () => Number(props.unRead?.num) >= threshold.value,
    (val) => {
      if (!val) {
        stopForce()
        return
      }
      // runForce()
      forceTimeout = setInterval(() => runForce(), 3 * 60 * 1000) // 三分钟提醒一次消息过多
    },
  )
  onBeforeUnmount(() => {
    stopForce()
  })

  return {
    isForce,
  }
}
